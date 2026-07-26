import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, ShieldX, Info } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskMeterProps {
  score: number; // 0-100
  level: RiskLevel;
  pattern: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, level, pattern }) => {
  // Determine color theme based on score tier
  const getTheme = () => {
    if (score <= 20) {
      return {
        bg: 'bg-emerald-950/40 border-emerald-800/80',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-600',
        text: 'text-emerald-400',
        progressGrad: 'from-emerald-500 to-teal-400',
        icon: ShieldCheck,
        description: 'No significant scam indicators found. Content appears consistent with legitimate opportunities.'
      };
    }
    if (score <= 40) {
      return {
        bg: 'bg-teal-950/40 border-teal-800/80',
        badge: 'bg-teal-500/20 text-teal-300 border-teal-600',
        text: 'text-teal-400',
        progressGrad: 'from-teal-500 to-cyan-400',
        icon: Info,
        description: 'Minor inconsistencies detected. Standard precautions recommended before committing.'
      };
    }
    if (score <= 60) {
      return {
        bg: 'bg-amber-950/40 border-amber-800/80',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-600',
        text: 'text-amber-400',
        progressGrad: 'from-amber-500 to-yellow-400',
        icon: AlertTriangle,
        description: 'Caution required! Multiple red flags or questionable contract terms detected.'
      };
    }
    if (score <= 80) {
      return {
        bg: 'bg-orange-950/40 border-orange-800/80',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-600',
        text: 'text-orange-400',
        progressGrad: 'from-orange-500 to-amber-500',
        icon: ShieldAlert,
        description: 'High risk detected! Strong scam indicators present. Do NOT share money or personal data.'
      };
    }
    return {
      bg: 'bg-rose-950/50 border-rose-800/80',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-600',
      text: 'text-rose-400',
      progressGrad: 'from-rose-600 to-red-500',
      icon: ShieldX,
      description: 'EXTREME SCAM WARNING! Known fraudulent scheme detected. Cease communication immediately.'
    };
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div className={`p-6 rounded-2xl border ${theme.bg} backdrop-blur-sm shadow-xl space-y-5 transition-all`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Score & Tier */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shrink-0 shadow-inner">
            <span className={`text-3xl font-black tracking-tight ${theme.text}`}>
              {score}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold absolute bottom-2">/ 100</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badge}`}>
                {level}
              </span>
              {pattern && pattern !== 'No Clear Pattern Detected' && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Pattern: {pattern}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 leading-snug font-medium max-w-md">
              {theme.description}
            </p>
          </div>
        </div>

        {/* Right: Icon Badge */}
        <div className="hidden sm:flex items-center justify-center p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0">
          <IconComponent className={`w-8 h-8 ${theme.text}`} />
        </div>
      </div>

      {/* Visual Risk Gauge Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
          <span className="text-emerald-400 font-semibold">0 (Safe)</span>
          <span className="text-amber-400 font-semibold">50 (Caution)</span>
          <span className="text-rose-400 font-semibold">100 (Extreme Scam)</span>
        </div>

        <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80 relative">
          {/* Multi-tier gradient background track */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 rounded-full" />
          
          {/* Active progress bar */}
          <div
            className={`h-full rounded-full bg-gradient-to-r ${theme.progressGrad} transition-all duration-1000 ease-out shadow-lg`}
            style={{ width: `${Math.max(5, score)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
