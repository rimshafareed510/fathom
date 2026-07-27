import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { EligibilityQuestion } from '../types';

interface EligibilityCheckerProps {
  questions: EligibilityQuestion[];
  onGoToSource: (paragraphNumber: number) => void;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({
  questions,
  onGoToSource,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, { value: string; isEligible: boolean; note?: string }>>({});

  if (!questions || questions.length === 0) return null;

  const handleSelectOption = (
    qId: string,
    val: string,
    isEligible: boolean,
    note?: string
  ) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: { value: val, isEligible, note },
    }));
  };

  const answeredCount = Object.keys(userAnswers).length;
  const isComplete = answeredCount === questions.length;

  const failedAnswers = (Object.values(userAnswers) as Array<{ value: string; isEligible: boolean; note?: string }>).filter((a) => !a.isEligible);
  const isOverallEligible = isComplete && failedAnswers.length === 0;
  const isConditional = isComplete && failedAnswers.length === 1;
  const isIneligible = isComplete && failedAnswers.length > 1;

  const handleReset = () => {
    setUserAnswers({});
  };

  return (
    <div id="eligibility-checker" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/50 rounded-lg text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Interactive Policy Eligibility Checker
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Personalized eligibility questionnaire generated specifically from your document's rules.
          </p>
        </div>

        {answeredCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
          <span>Questionnaire Progress ({answeredCount}/{questions.length})</span>
          <span>{Math.round((answeredCount / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${(answeredCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Overall Status Banner / Estimated Result */}
      {answeredCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-2xl mb-6 border shadow-sm ${
            isOverallEligible
              ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : isConditional
              ? 'bg-amber-50/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
              : 'bg-rose-50/90 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {isOverallEligible ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : isConditional ? (
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/80 border border-current">
                  Estimated Result
                </span>
                <span className="text-xs font-semibold">
                  {answeredCount}/{questions.length} Questions Answered
                </span>
              </div>

              <h3 className="text-lg font-extrabold mb-1.5 flex items-center gap-2">
                {isOverallEligible
                  ? '🟢 Likely Eligible'
                  : isConditional
                  ? '🟡 More Information Needed / Conditional'
                  : '🔴 Action Required / Non-Compliant'}
              </h3>

              <p className="text-xs md:text-sm leading-relaxed mb-3">
                {isOverallEligible
                  ? 'Based on your answers, you meet all mandatory criteria evaluated against the policy document clauses.'
                  : isConditional
                  ? 'You satisfy most requirements, but 1 criterion requires additional verification or documentation.'
                  : `You currently do not meet ${failedAnswers.length} mandatory policy requirements.`}
              </p>

              {/* Grounded Citation breakdown for result */}
              <div className="pt-2 border-t border-current/20 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold">Supporting Document Citations:</span>
                {questions.map((q) => {
                  const ans = userAnswers[q.id];
                  if (!ans) return null;
                  return (
                    <button
                      key={q.id}
                      onClick={() => onGoToSource(q.paragraphCitation)}
                      className={`px-2 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-all ${
                        ans.isEligible
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-900 dark:bg-rose-900 dark:text-rose-200 hover:bg-rose-200'
                      }`}
                    >
                      {ans.isEligible ? '✓' : '⚠'} Para #{q.paragraphCitation}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Questions list */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = userAnswers[q.id];

          return (
            <div
              key={q.id}
              className="p-4 md:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm md:text-base font-semibold text-slate-900 dark:text-white">
                    {q.question}
                  </h4>
                </div>

                <button
                  onClick={() => onGoToSource(q.paragraphCitation)}
                  className="px-2 py-0.5 text-xs font-mono font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 rounded border border-indigo-200 dark:border-indigo-800 shrink-0"
                >
                  Para #{q.paragraphCitation}
                </button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt) => {
                  const isChecked = selected?.value === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(q.id, opt.value, opt.isEligible, opt.note)}
                      className={`p-3 rounded-xl border text-left text-xs md:text-sm font-medium transition-all ${
                        isChecked
                          ? opt.isEligible
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-500 ring-2 ring-emerald-500/20 dark:bg-emerald-950 dark:text-emerald-200'
                            : 'bg-red-50 text-red-900 border-red-500 ring-2 ring-red-500/20 dark:bg-red-950 dark:text-red-200'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Feedback note if selected option has violation */}
              {selected?.note && (
                <div className="p-3 rounded-lg bg-red-100/60 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{selected.note}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
