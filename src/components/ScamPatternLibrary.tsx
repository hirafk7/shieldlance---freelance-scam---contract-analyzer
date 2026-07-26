import React, { useState } from 'react';
import { Search, ShieldAlert, AlertTriangle, ShieldCheck, BookOpen, Filter, ArrowUpRight } from 'lucide-react';
import { SCAM_PATTERNS } from '../data/scamPatterns';
import { ScamPatternItem } from '../types';

export const ScamPatternLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedPatternId, setExpandedPatternId] = useState<string | null>(SCAM_PATTERNS[0].id);

  const categories = [
    'All',
    'Payment Scams',
    'Work Exploitation',
    'Identity & Phishing',
    'Contract Hazards',
    'Off-Platform Fraud'
  ];

  const filteredPatterns = SCAM_PATTERNS.filter((pattern) => {
    const matchesCategory = selectedCategory === 'All' || pattern.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      pattern.title.toLowerCase().includes(term) ||
      pattern.summary.toLowerCase().includes(term) ||
      pattern.realWorldExample.toLowerCase().includes(term) ||
      pattern.redFlags.some((rf) => rf.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Freelance Fraud & Scam Pattern Library
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          Comprehensive reference guide to real-world schemes targeting remote freelancers, contractors, and job seekers. Learn how each scam works, spot red flags, and stay protected.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scams by keyword (e.g., 'check', 'telegram', 'test task', 'unlimited revisions')..."
            className="w-full bg-slate-950 text-slate-100 pl-11 pr-4 py-3 rounded-xl border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm placeholder:text-slate-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
          <span>Showing {filteredPatterns.length} scam patterns</span>
          {searchTerm && <span>Filtered by "{searchTerm}"</span>}
        </div>

        {filteredPatterns.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No scam patterns found matching your query.</p>
            <p className="text-xs">Try searching for broader terms like "check", "deposit", or "contract".</p>
          </div>
        ) : (
          filteredPatterns.map((pattern) => {
            const isExpanded = expandedPatternId === pattern.id;

            return (
              <div
                key={pattern.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all"
              >
                {/* Header Card Toggle */}
                <button
                  onClick={() => setExpandedPatternId(isExpanded ? null : pattern.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        pattern.riskLevel === 'Extreme'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-700/50'
                          : pattern.riskLevel === 'High'
                          ? 'bg-orange-500/20 text-orange-300 border-orange-700/50'
                          : 'bg-amber-500/20 text-amber-300 border-amber-700/50'
                      }`}>
                        {pattern.riskLevel} Risk
                      </span>

                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
                        {pattern.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100">{pattern.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{pattern.summary}</p>
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 shrink-0 mt-1 flex items-center gap-1">
                    {isExpanded ? 'Hide Details' : 'View Breakdown'}
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </span>
                </button>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-6 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-6">
                    
                    {/* How It Works */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                        <span>How This Scheme Works</span>
                      </h4>
                      <ul className="space-y-1.5 pl-2">
                        {pattern.howItWorks.map((step, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Real World Example Callout */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                        Real-World Example Message:
                      </span>
                      <p className="text-xs font-mono text-amber-100 italic leading-relaxed">
                        {pattern.realWorldExample}
                      </p>
                    </div>

                    {/* Red Flags & How to Protect Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Red flags */}
                      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Key Red Flags</span>
                        </h4>
                        <ul className="space-y-1">
                          {pattern.redFlags.map((flag, idx) => (
                            <li key={idx} className="text-xs text-rose-200/90 leading-relaxed flex items-start gap-1.5">
                              <span className="text-rose-400 font-bold">✕</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* How to Protect */}
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>How to Protect Yourself</span>
                        </h4>
                        <ul className="space-y-1">
                          {pattern.howToProtect.map((tip, idx) => (
                            <li key={idx} className="text-xs text-emerald-200/90 leading-relaxed flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
