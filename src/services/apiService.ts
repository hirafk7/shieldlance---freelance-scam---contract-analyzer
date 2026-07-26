import { AnalysisResult, AnalyzeRequestBody } from '../types';

export async function analyzeContent(payload: AnalyzeRequestBody): Promise<AnalysisResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s frontend timeout

  try {
    const response = await fetch('/.netlify/functions/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const responseText = await response.text();
    let data: any;

    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error('Received an unreadable server response. Please try again.');
    }

    if (!response.ok) {
      const serverMessage = data?.error || `Analysis failed (HTTP ${response.status}).`;
      throw new Error(serverMessage);
    }

    // Validate structure of response
    if (typeof data.riskScore !== 'number' || !data.summary || !Array.isArray(data.redFlags)) {
      throw new Error('Analysis response was incomplete. Please retry analyzing your text.');
    }

    return data as AnalysisResult;
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new Error('This is taking longer than expected — please check your internet connection and try again.');
    }

    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
      throw new Error('Network error: Unable to connect to ShieldLance analyzer service. Please check your connection.');
    }

    throw new Error(err.message || 'An unexpected error occurred during analysis. Please try again.');
  }
}
