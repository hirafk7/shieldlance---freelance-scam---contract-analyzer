import React, { useState } from 'react';
import { 
  Search, Upload, Image as ImageIcon, X, Copy, Check, AlertTriangle, 
  ShieldAlert, ShieldCheck, FileText, ArrowRight, RefreshCw, Sparkles, 
  MessageSquare, HelpCircle, AlertCircle, History, ExternalLink
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { analyzeContent } from '../services/apiService';
import { RiskMeter } from './RiskMeter';
import { SAMPLE_INPUTS, SampleInput } from '../data/sampleInputs';

const MAX_CHARS = 8000;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB limit

interface CoreAnalyzerProps {
  onSelectPatternFromLibrary?: (patternId: string) => void;
}

export const CoreAnalyzer: React.FC<CoreAnalyzerProps> = () => {
  const [inputText, setInputText] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [copiedReply, setCopiedReply] = useState<boolean>(false);
  const [scanHistory, setScanHistory] = useState<AnalysisResult[]>([]);

  // Handle Image Upload with <4MB & format checks
  const handleImageChange = (file: File | null) => {
    setError(null);
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      setImageBase64(null);
      setImageMimeType(null);
      return;
    }

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Unsupported image format. Please upload a PNG, JPEG, or WEBP screenshot.');
      return;
    }

    // Validate size (< 4MB)
    if (file.size > MAX_IMAGE_BYTES) {
      setError('Image file is too large (exceeds 4MB). Please upload a smaller screenshot or paste the text directly.');
      return;
    }

    setImageFile(file);
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Str = reader.result as string;
      setImagePreview(base64Str);
      setImageBase64(base64Str);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  // Load Preset Sample
  const handleLoadSample = (sample: SampleInput) => {
    setInputText(sample.text);
    setImageFile(null);
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType(null);
    setError(null);
    setResult(null);
  };

  // Clear Form
  const handleClear = () => {
    setInputText('');
    setImageFile(null);
    setImagePreview(null);
    setImageBase64(null);
    setImageMimeType(null);
    setError(null);
  };

  // Submit Analysis
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedText = inputText.trim();

    if (!trimmedText && !imageBase64) {
      setError('Please paste text or upload a screenshot to analyze.');
      return;
    }

    if (trimmedText.length > MAX_CHARS) {
      setError(`Input exceeds maximum limit of ${MAX_CHARS.toLocaleString()} characters.`);
      return;
    }

    setLoading(true);

    try {
      const res = await analyzeContent({
        text: trimmedText || undefined,
        imageBase64: imageBase64 || undefined,
        mimeType: imageMimeType || undefined,
      });

      setResult(res);
      setScanHistory((prev) => [res, ...prev.slice(0, 4)]);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Copy Reply to Clipboard
  const handleCopyReply = () => {
    if (result?.suggestedReply) {
      navigator.clipboard.writeText(result.suggestedReply);
      setCopiedReply(true);
      setTimeout(() => setCopiedReply(false), 2500);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Scam & Contract Guard</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analyze Job Posts, Client Messages & Contracts Before You Commit
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Paste suspicious communications or upload a screenshot. ShieldLance checks for fake check schemes, off-platform redirects, unpaid test tasks, upfront fee traps, and predatory contract terms in seconds.
          </p>
        </div>
      </div>

      {/* Main Analyzer Form */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
        
        {/* Presets / Sample Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Try Preset Examples:</span>
            </span>
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-slate-200 underline"
              >
                Clear Input
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {SAMPLE_INPUTS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleLoadSample(sample)}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-left transition-all group focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    sample.category === 'Legitimate Offer'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-700/50'
                      : sample.category === 'Predatory Contract'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-700/50'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-700/50'
                  }`}>
                    {sample.badge}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-xs font-medium text-slate-200 line-clamp-1">{sample.title}</p>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Text Area Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-300 font-semibold">
              <label htmlFor="analyzer-text" className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Job Post, Message, or Contract Text:</span>
              </label>
              <span className={`text-[11px] ${
                inputText.length > MAX_CHARS ? 'text-rose-400 font-bold' : 'text-slate-400'
              }`}>
                {inputText.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
              </span>
            </div>

            <textarea
              id="analyzer-text"
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste job description, Telegram/WhatsApp client chat, or contract clause here (e.g. 'We will mail you a check for equipment...', 'Deposit $100 onboarding fee...', or 'Unlimited revisions required...')."
              className="w-full bg-slate-950 text-slate-100 rounded-xl p-4 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm placeholder:text-slate-600 transition-colors resize-y font-mono leading-relaxed"
            />
          </div>

          {/* Screenshot Upload Dropzone */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Or Upload Screenshot (PNG, JPEG, WEBP - Max 4MB):</span>
            </span>

            {!imagePreview ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-800 hover:border-slate-600 rounded-xl p-5 text-center bg-slate-950/60 hover:bg-slate-950 transition-colors cursor-pointer group"
              >
                <input
                  type="file"
                  id="image-upload"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-slate-800 group-hover:bg-slate-700 text-emerald-400 transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                      Click to upload screenshot
                    </span>
                    <span className="text-xs text-slate-500 block"> or drag & drop file here</span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Uploaded Screenshot Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-slate-800"
                  />
                  <div>
                    <p className="text-xs font-medium text-slate-200 truncate max-w-xs">{imageFile?.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {((imageFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB • Ready for AI OCR analysis
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleImageChange(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                  title="Remove screenshot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Inline Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-rose-300">Analysis Notice</p>
                <p className="leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              disabled={loading || (!inputText.trim() && !imageBase64)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-950/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing... this may take up to 15 seconds</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Run Fraud & Contract Analysis</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Output Section */}
      {result && (
        <div id="analysis-results" className="space-y-6 animate-fadeIn">
          
          {/* Header result title */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <span>ShieldLance Verification Verdict</span>
            </h2>
            <span className="text-xs text-slate-400">
              Analyzed at {result.analyzedAt ? new Date(result.analyzedAt).toLocaleTimeString() : 'Just now'}
            </span>
          </div>

          {/* 1. Risk Meter & Score */}
          <RiskMeter
            score={result.riskScore}
            level={result.riskLevel}
            pattern={result.detectedPattern}
          />

          {/* 2. Plain Language Summary */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Executive Summary</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {result.summary}
            </p>
          </div>

          {/* 3. Red Flags & Green Flags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Red Flags Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Detected Red Flags ({result.redFlags.length})</span>
                </h3>
              </div>

              {result.redFlags.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No red flags identified in submitted content.</p>
              ) : (
                <ul className="space-y-3">
                  {result.redFlags.map((flag, idx) => (
                    <li key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-200">{flag.label}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          flag.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-700/50'
                            : flag.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-700/50'
                            : flag.severity === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-700/50'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {flag.severity} Severity
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{flag.explanation}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Green Flags Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Legitimacy Signals / Green Flags ({result.greenFlags.length})</span>
              </h3>

              {result.greenFlags.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No explicit legitimacy signals observed in submitted content.</p>
              ) : (
                <ul className="space-y-3">
                  {result.greenFlags.map((flag, idx) => (
                    <li key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                      <span className="text-xs font-bold text-slate-200 block">{flag.label}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{flag.explanation}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 4. Predatory Contract Clauses (if detected) */}
          {result.predatoryClauses && result.predatoryClauses.length > 0 && (
            <div className="p-6 rounded-2xl bg-amber-950/30 border border-amber-800/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Predatory Contract Terms & Clauses ({result.predatoryClauses.length})</span>
              </h3>

              <div className="space-y-3">
                {result.predatoryClauses.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-amber-900/50 space-y-2">
                    <p className="text-xs font-mono text-amber-200 bg-amber-950/60 p-2.5 rounded-lg border border-amber-800/40">
                      "{item.clause}"
                    </p>
                    <div className="text-xs text-slate-300 space-y-1">
                      <span className="font-semibold text-rose-400">Why this is unfair to you:</span>
                      <p className="leading-relaxed text-slate-400">{item.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Recommended Next Steps */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Recommended Next Actions</span>
            </h3>

            <ul className="space-y-2">
              {result.recommendedSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-800">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Ready-to-Send Suggested Reply with Copy Button */}
          {result.suggestedReply && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Ready-to-Send Client Response</span>
                </h3>

                <button
                  onClick={handleCopyReply}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors shadow-md"
                >
                  {copiedReply ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Suggested Reply</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-200 leading-relaxed whitespace-pre-wrap">
                {result.suggestedReply}
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Send this non-accusatory response to set clear boundaries or probe whether the client is legitimate.
              </p>
            </div>
          )}

          {/* 7. Probing Questions */}
          {result.probingQuestions && result.probingQuestions.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Verification Questions to Ask the Client</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.probingQuestions.map((q, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">?</span>
                    <span className="leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Run New Scan Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                handleClear();
                setResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Another Analysis</span>
            </button>
          </div>
        </div>
      )}

      {/* History Sidebar/Section */}
      {scanHistory.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            <span>Recent Scan History ({scanHistory.length})</span>
          </h3>

          <div className="space-y-2">
            {scanHistory.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setResult(item);
                  setTimeout(() => {
                    document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-left flex items-center justify-between gap-4 transition-all group"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.riskScore <= 20 ? 'bg-emerald-500/20 text-emerald-300' :
                      item.riskScore <= 60 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      Score {item.riskScore} • {item.riskLevel}
                    </span>
                    <span className="text-[11px] text-slate-400 truncate font-semibold">
                      {item.detectedPattern}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 truncate font-mono">{item.inputSnippet}</p>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
