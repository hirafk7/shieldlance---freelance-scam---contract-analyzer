import React, { useState } from 'react';
import { Shield, BookOpen, HelpCircle, Search, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'library' | 'quiz';
  setActiveTab: (tab: 'analyzer' | 'library' | 'quiz') => void;
  onOpenDisclaimer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenDisclaimer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'analyzer', label: 'Scam & Contract Analyzer', icon: Search },
    { id: 'library', label: 'Scam Pattern Library', icon: BookOpen },
    { id: 'quiz', label: 'Safety Quiz', icon: HelpCircle },
  ] as const;

  const handleNavClick = (id: 'analyzer' | 'library' | 'quiz') => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('analyzer')} 
          className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          aria-label="ShieldLance Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-white font-sans">Shield<span className="text-emerald-400">Lance</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                AI Fraud Detection
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Freelance & Contract Risk Analyzer</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 shadow-inner border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action button & Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDisclaimer}
            className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-300 px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
            title="How ShieldLance AI Works"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Disclaimer</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onOpenDisclaimer();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-400 hover:text-emerald-300"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Feature Transparency & Legal Notice</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
