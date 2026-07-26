import React from 'react';
import { X, ShieldAlert, Sparkles, AlertTriangle, Check } from 'lucide-react';

interface AiDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiDisclaimerModal: React.FC<AiDisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Feature Transparency & Legal Notice</h3>
            <p className="text-xs text-slate-400">ShieldLance Decision-Support Architecture</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="space-y-3 text-xs leading-relaxed text-slate-300 border-t border-b border-slate-800 py-4">
          <p className="font-semibold text-slate-100">
            ShieldLance utilizes artificial intelligence (Google Gemini AI) to perform pattern recognition on user-submitted job descriptions, client chats, and legal clauses.
          </p>

          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/80 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Not Legal or Financial Advice</span>
            </div>
            <p className="text-amber-200/90 text-[11px] leading-relaxed">
              ShieldLance risk scores and contract flag identifications are advisory decision-support utilities. They do not constitute formal legal counsel, formal fraud guarantee, or official background checks.
            </p>
          </div>

          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Always verify high-stakes direct-deposit or equipment requests independently with official company HR departments.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No user data, text inputs, or uploaded screenshots are stored on external databases or sold to third parties.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>All API calls execute server-side; your secret credentials remain strictly protected.</span>
            </li>
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
