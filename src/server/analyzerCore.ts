import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../types';

export const SYSTEM_PROMPT = `You are ShieldLance, a fraud-detection assistant specialized in freelance and remote-work scams. You analyze job posts, client messages, and contract text submitted by freelancers who want to know if something is a scam before they respond, accept work, or send money.

Your job:
1. Read the submitted text (or transcribed screenshot) carefully and look for concrete evidence — do not guess or use generic warnings unrelated to what was actually submitted.
2. Assign a risk score from 0 (completely safe) to 100 (extreme, near-certain scam) based on the specific signals present.
3. Map the score to a risk level: 0-20 Safe/Legitimate, 21-40 Low Risk, 41-60 Caution, 61-80 High Risk, 81-100 Extreme Scam Warning.
4. Identify the single most likely scam pattern from this list, or state "No Clear Pattern Detected" if none apply: Fake Check Scam, Off-Platform Redirect, Unpaid Test Task, Upfront Fee Request, Phishing for Personal Info, Overpayment Scam, Fake Client Identity, Predatory Contract Terms, Other (name it).
5. Write a plain-language summary (2-4 sentences) that references specific phrases or details from the submitted text.
6. List red flags actually present in the text, each with severity (Low, Medium, High, Critical) and a one-sentence explanation.
7. List green flags (legitimacy signals) actually present, if any.
8. If the text is or contains a contract/agreement, identify predatory clauses (e.g. unlimited revisions, vague or delayed payment terms, unfair IP assignment, one-sided cancellation rights, non-compete overreach) with plain-language explanations of why each is unfair to the freelancer.
9. Give 2-5 concrete recommended next steps appropriate to the risk level.
10. Write one ready-to-send suggested reply the freelancer could send to the client — professional, non-accusatory, designed to surface more information or set a boundary.
11. Write 2-4 specific probing questions the freelancer could ask the client to verify legitimacy.

Rules:
- Base every claim on the actual submitted content. Never fabricate details that are not present in the input.
- If the input is too short or vague to assess, say so honestly in the summary and lower confidence rather than inventing red flags.
- Be calibrated: do not mark everything as high risk. Many legitimate job posts and contracts exist — reward genuine legitimacy signals.
- Never ask the user for personally identifying information.
- Respond ONLY with valid JSON matching the exact schema provided. No prose outside the JSON, no markdown code fences.`;

export const analysisResponseSchema = {
  type: Type.OBJECT,
  properties: {
    riskScore: { type: Type.INTEGER, description: "Risk score from 0 to 100" },
    riskLevel: {
      type: Type.STRING,
      description: "One of: Safe/Legitimate, Low Risk, Caution, High Risk, Extreme Scam Warning"
    },
    detectedPattern: {
      type: Type.STRING,
      description: "Specific pattern name or 'No Clear Pattern Detected'"
    },
    summary: { type: Type.STRING, description: "2-4 sentence summary referencing specific submitted details" },
    redFlags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          explanation: { type: Type.STRING },
          severity: { type: Type.STRING, description: "Low, Medium, High, or Critical" }
        },
        required: ["label", "explanation", "severity"]
      }
    },
    greenFlags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          explanation: { type: Type.STRING }
        },
        required: ["label", "explanation"]
      }
    },
    predatoryClauses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clause: { type: Type.STRING },
          explanation: { type: Type.STRING }
        },
        required: ["clause", "explanation"]
      }
    },
    recommendedSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    suggestedReply: { type: Type.STRING },
    probingQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    }
  },
  required: [
    "riskScore",
    "riskLevel",
    "detectedPattern",
    "summary",
    "redFlags",
    "greenFlags",
    "predatoryClauses",
    "recommendedSteps",
    "suggestedReply",
    "probingQuestions"
  ]
};

export async function runShieldLanceAnalysis(
  text?: string,
  imageBase64?: string,
  mimeType?: string
): Promise<{ status: number; data?: AnalysisResult; error?: string }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('MY_GEMINI_API_KEY')) {
    return {
      status: 500,
      error: 'Server misconfiguration: GEMINI_API_KEY is missing or not set. Please configure GEMINI_API_KEY in server environment variables.'
    };
  }

  // Validate input presence
  const trimmedText = text ? text.trim() : '';
  if (!trimmedText && !imageBase64) {
    return {
      status: 400,
      error: 'Please provide text content or upload a screenshot to analyze.'
    };
  }

  if (trimmedText.length > 8000) {
    return {
      status: 400,
      error: 'Input text exceeds maximum length of 8,000 characters. Please shorten your input.'
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const parts: any[] = [];

    if (imageBase64) {
      // Strip data URL prefix if present (e.g. data:image/png;base64,)
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      const cleanMime = mimeType || 'image/png';

      parts.push({
        inlineData: {
          mimeType: cleanMime,
          data: cleanBase64
        }
      });
    }

    if (trimmedText) {
      parts.push({
        text: `Submitted text for scam analysis:\n"""\n${trimmedText}\n"""`
      });
    } else {
      parts.push({
        text: `Please read and transcribe the text inside this screenshot image, then analyze it for scam risks according to your instructions.`
      });
    }

    // Wrap call with 25s timeout promise
    const timeoutPromise = new Promise<{ timeout: true }>((resolve) =>
      setTimeout(() => resolve({ timeout: true }), 25000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: analysisResponseSchema
      }
    });

    const result = await Promise.race([apiPromise, timeoutPromise]);

    if ('timeout' in result) {
      return {
        status: 504,
        error: 'Analysis timed out after 25 seconds. Please try again with a shorter snippet or smaller image.'
      };
    }

    const rawText = result.text;
    if (!rawText) {
      return {
        status: 502,
        error: 'Empty response received from AI model. Please try again.'
      };
    }

    // Clean code fences if present
    let jsonString = rawText.trim();
    if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }

    let parsed: any;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseErr) {
      console.error('Failed to parse AI response JSON:', parseErr, rawText);
      return {
        status: 502,
        error: 'Could not parse analysis output. Please retry or adjust your input.'
      };
    }

    // Sanitize and validate fields
    const riskScore = typeof parsed.riskScore === 'number' ? Math.max(0, Math.min(100, Math.round(parsed.riskScore))) : 50;

    let riskLevel = parsed.riskLevel;
    if (!riskLevel) {
      if (riskScore <= 20) riskLevel = 'Safe/Legitimate';
      else if (riskScore <= 40) riskLevel = 'Low Risk';
      else if (riskScore <= 60) riskLevel = 'Caution';
      else if (riskScore <= 80) riskLevel = 'High Risk';
      else riskLevel = 'Extreme Scam Warning';
    }

    const validated: AnalysisResult = {
      riskScore,
      riskLevel,
      detectedPattern: parsed.detectedPattern || 'No Clear Pattern Detected',
      summary: parsed.summary || 'Analysis complete.',
      redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
      greenFlags: Array.isArray(parsed.greenFlags) ? parsed.greenFlags : [],
      predatoryClauses: Array.isArray(parsed.predatoryClauses) ? parsed.predatoryClauses : [],
      recommendedSteps: Array.isArray(parsed.recommendedSteps) ? parsed.recommendedSteps : [],
      suggestedReply: parsed.suggestedReply || '',
      probingQuestions: Array.isArray(parsed.probingQuestions) ? parsed.probingQuestions : [],
      analyzedAt: new Date().toISOString(),
      inputSnippet: trimmedText ? (trimmedText.length > 120 ? trimmedText.substring(0, 117) + '...' : trimmedText) : '[Uploaded Screenshot]'
    };

    return {
      status: 200,
      data: validated
    };

  } catch (err: any) {
    console.error('ShieldLance core analysis error:', err);
    const errMessage = err?.message || String(err);

    if (errMessage.includes('429') || errMessage.toLowerCase().includes('quota') || errMessage.toLowerCase().includes('rate')) {
      return {
        status: 429,
        error: 'ShieldLance is receiving high demand right now — please try again in a moment.'
      };
    }

    if (errMessage.includes('401') || errMessage.includes('403') || errMessage.includes('API_KEY_INVALID') || errMessage.includes('UNAUTHENTICATED')) {
      return {
        status: 500,
        error: 'Server error: Invalid or unauthenticated GEMINI_API_KEY. Please verify your API key setup in Netlify environment variables.'
      };
    }

    return {
      status: 500,
      error: 'Failed to perform scam analysis. Please check your network connection and try again.'
    };
  }
}
