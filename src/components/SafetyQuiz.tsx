import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Award, ArrowRight, BookOpen } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export const SafetyQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedVerdict, setSelectedVerdict] = useState<'scam' | 'legitimate' | 'caution' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (verdict: 'scam' | 'legitimate' | 'caution') => {
    if (isAnswered) return;

    setSelectedVerdict(verdict);
    setIsAnswered(true);

    if (verdict === currentQuestion.correctVerdict) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedVerdict(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedVerdict(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Skills Check</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Freelance Scam & Contract Safety Quiz
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Test your instinct against realistic job offers, client chats, and contract clauses. Learn how to spot subtle red flags before accepting client work.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
              <span>Scenario {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Score: {score} / {currentIndex + (isAnswered ? 1 : 0)}</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Card */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                Context: {currentQuestion.contextType}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-100 leading-relaxed">
              {currentQuestion.scenario}
            </p>

            {/* Submitted text snippet */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-200/90 leading-relaxed italic">
              {currentQuestion.submittedTextSnippet}
            </div>
          </div>

          {/* Multiple choice options */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              How would you classify this scenario?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedVerdict === opt.verdict;
                const isCorrect = opt.verdict === currentQuestion.correctVerdict;

                let btnStyle = 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-600 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/90 border-rose-600 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.verdict}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt.verdict)}
                    className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${btnStyle} focus:outline-none`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Feedback Panel */}
          {isAnswered && (
            <div className={`p-5 rounded-xl border space-y-3 animate-fadeIn ${
              selectedVerdict === currentQuestion.correctVerdict
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                : 'bg-rose-950/40 border-rose-800 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedVerdict === currentQuestion.correctVerdict ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">Correct Assessment!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300">Incorrect — Here's Why:</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed text-slate-300 font-medium">
                {currentQuestion.explanation}
              </p>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-400 block uppercase tracking-wider text-[10px]">
                  Safety Takeaway:
                </span>
                <p className="text-slate-300">{currentQuestion.keyTakeaway}</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Final Score'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Summary Card */
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-sm text-slate-300">
              You scored <span className="text-emerald-400 font-extrabold text-lg">{score}</span> out of{' '}
              <span className="font-bold text-slate-100">{QUIZ_QUESTIONS.length}</span> correct scenarios.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 leading-relaxed">
            {score === QUIZ_QUESTIONS.length ? (
              <p className="text-emerald-300 font-semibold">
                🎉 Perfect score! You have sharp instincts for freelance scam red flags and contract pitfalls.
              </p>
            ) : score >= 5 ? (
              <p className="text-amber-300 font-semibold">
                👍 Good job! You spotted most scams. Review the Scam Pattern Library to refine your vigilance.
              </p>
            ) : (
              <p className="text-rose-300 font-semibold">
                ⚠️ Scammers are becoming more sophisticated. Keep using ShieldLance Analyzer on real client messages before accepting work.
              </p>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Safety Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
