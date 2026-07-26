import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CoreAnalyzer } from './components/CoreAnalyzer';
import { ScamPatternLibrary } from './components/ScamPatternLibrary';
import { SafetyQuiz } from './components/SafetyQuiz';
import { AiDisclaimerModal } from './components/AiDisclaimerModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'library' | 'quiz'>('analyzer');
  const [disclaimerOpen, setDisclaimerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDisclaimer={() => setDisclaimerOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-grow pt-4">
        {activeTab === 'analyzer' && (
          <CoreAnalyzer />
        )}

        {activeTab === 'library' && (
          <ScamPatternLibrary />
        )}

        {activeTab === 'quiz' && (
          <SafetyQuiz />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onOpenDisclaimer={() => setDisclaimerOpen(true)} />

      {/* AI Transparency Notice Modal */}
      <AiDisclaimerModal
        isOpen={disclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
    </div>
  );
}
