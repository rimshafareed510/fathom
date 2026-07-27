import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Flame,
  Bot,
  CheckCircle2,
  Upload,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Award
} from 'lucide-react';
import { TourStep } from '../types';

interface TourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'welcome',
    title: 'Welcome to Fathom',
    content: 'Fathom automatically translates complex legal, financial, visa, tenancy, and insurance policies into plain English with automatic deadline and risk detection.',
    position: 'center'
  },
  {
    targetId: 'upload-options',
    title: 'Upload Options',
    content: 'Upload PDFs, paste raw policy text, or enter any web URL. You can also quickly test our rich pre-loaded sample policies.',
    position: 'bottom'
  },
  {
    targetId: 'ai-summary',
    title: 'AI Summary & Insights',
    content: 'Get an instant executive summary, policy complexity ratings, reading grade difficulty scores, and percentage simplification metrics.',
    position: 'bottom'
  },
  {
    targetId: 'risk-warning-panel',
    title: 'Risk & Warning Panel',
    content: 'Automatically identifies 🔴 Critical Deadlines, Financial Penalties, Visa Expirations, and 🟡 Missing Documents. Click "Go to Source" to jump right to the original clause.',
    position: 'bottom'
  },
  {
    targetId: 'citation-heatmap',
    title: 'Citation Heatmap',
    content: 'Visualizes which paragraphs are referenced most during AI analysis and conversations. Darker blue means heavily referenced clauses!',
    position: 'bottom'
  },
  {
    targetId: 'ask-questions',
    title: 'Ask Questions (Grounded Chat)',
    content: 'Chat with our grounded AI to ask specific questions about the document. Answers include direct paragraph citation tags you can click.',
    position: 'bottom'
  },
  {
    targetId: 'eligibility-checker',
    title: 'Eligibility Checker',
    content: 'Take an interactive questionnaire created specifically for your policy to verify whether you qualify or meet mandatory requirements.',
    position: 'bottom'
  },
  {
    targetId: 'source-citations',
    title: 'Source Citations & Transparency',
    content: 'Every AI explanation includes verifiable citations pointing directly to exact paragraph quotes in the original text.',
    position: 'bottom'
  },
  {
    targetId: 'finish',
    title: 'You\'re Ready!',
    content: 'You\'re ready to analyze your first policy and take control of critical deadlines.',
    position: 'center'
  }
];

export const FirstTimeUserTour: React.FC<TourProps> = ({ isOpen, onClose, onNavigateToTab }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
    } else {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (onNavigateToTab) {
        if (nextIdx === 3) onNavigateToTab('risks');
        else if (nextIdx === 4) onNavigateToTab('heatmap');
        else if (nextIdx === 5) onNavigateToTab('chat');
        else if (nextIdx === 6) onNavigateToTab('eligibility');
        else if (nextIdx === 7) onNavigateToTab('document');
      }
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const stepIcons = [
    <Sparkles key="1" className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    <Upload key="2" className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    <BookOpen key="3" className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
    <ShieldAlert key="4" className="w-8 h-8 text-red-600 dark:text-red-400" />,
    <Flame key="5" className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
    <Bot key="6" className="w-8 h-8 text-violet-600 dark:text-violet-400" />,
    <CheckCircle2 key="7" className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
    <BookOpen key="8" className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    <Award key="9" className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
  ];

  return (
    <AnimatePresence>
      <div id="tour-overlay-root" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Top banner accent */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Skip tour"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-8">
            {/* Step badge & icon */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                {stepIcons[currentStepIndex]}
              </div>
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 rounded-full border border-indigo-200/60 dark:border-indigo-800/60">
                Step {currentStepIndex + 1} of {TOUR_STEPS.length}
              </span>
            </div>

            {/* Title & content */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {currentStep.title}
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {currentStep.content}
            </p>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {TOUR_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStepIndex
                      ? 'w-6 bg-indigo-600 dark:bg-indigo-400'
                      : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to tour step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Skip Tour
              </button>

              <div className="flex items-center gap-2">
                {!isFirst && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                )}

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  {isLast ? (
                    <>Finish <CheckCircle2 className="w-4 h-4" /></>
                  ) : (
                    <>Next <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
