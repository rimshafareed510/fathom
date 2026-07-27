import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Clock,
  BookOpen,
  CheckCircle,
  FileText,
  AlertCircle,
  Award,
  Layers,
  ArrowRight,
  TrendingDown,
  BarChart,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AIInsightsData, RiskCardData } from '../types';

interface AIInsightsPanelProps {
  insights: AIInsightsData;
  risks?: RiskCardData[];
  onGoToSource: (paragraphNumber: number) => void;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insights, risks = [], onGoToSource }) => {
  if (!insights) return null;

  // Complexity badge styling
  const getComplexityBadge = (rating: 'Easy' | 'Medium' | 'Hard') => {
    switch (rating) {
      case 'Easy':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            Easy Complexity
          </span>
        );
      case 'Medium':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            Medium Complexity
          </span>
        );
      case 'Hard':
        return (
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border border-red-300 dark:border-red-800">
            High Complexity
          </span>
        );
    }
  };

  // Dynamically compute chart breakdown directly from actual risks or insights
  const deadlineCount = risks.length > 0
    ? risks.filter(r => r.category.includes('Deadline') || r.category.includes('Cutoff') || r.category.includes('Expiration')).length
    : insights.totalDeadlinesFound;

  const penaltyCount = risks.length > 0
    ? risks.filter(r => r.category.includes('Penalty') || r.category.includes('Financial')).length
    : insights.totalPenalties;

  const docCount = risks.length > 0
    ? risks.filter(r => r.category.includes('Document') || r.category.includes('Missing')).length
    : insights.totalRequiredDocuments;

  const ruleCount = risks.length > 0
    ? risks.filter(r => r.category.includes('Eligibility') || r.category.includes('Compliance') || r.category.includes('Action') || r.category.includes('Requirement')).length
    : insights.totalEligibilityRules;

  const exceptionCount = risks.length > 0
    ? risks.filter(r => r.category.includes('Exception') || r.category.includes('Restriction')).length
    : insights.totalExceptions;

  const benefitCount = insights.totalBenefits || 2;

  const chartData = [
    { name: 'Deadlines', count: deadlineCount, fill: '#ef4444' },
    { name: 'Rules', count: ruleCount, fill: '#3b82f6' },
    { name: 'Required Docs', count: docCount, fill: '#f59e0b' },
    { name: 'Penalties', count: penaltyCount, fill: '#dc2626' },
    { name: 'Exceptions', count: exceptionCount, fill: '#8b5cf6' },
    { name: 'Benefits', count: benefitCount, fill: '#10b981' },
  ];

  return (
    <div id="ai-insights-panel" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              AI Insights Dashboard
            </h2>
          </div>
          <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
            Instant reading metrics, readability improvement scores, and policy clause distribution.
          </p>
        </div>

        <div>{getComplexityBadge(insights.policyComplexityRating)}</div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Reading Time
            </span>
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {insights.estimatedReadingTimeMinutes} mins
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
            ~200 wpm standard speed
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Reading Level
            </span>
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              {insights.simplifiedDifficultyScore}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 line-through block mt-0.5">
            Original: {insights.originalDifficultyScore}
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Simplification
            </span>
            <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {insights.percentageSimplification}%
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
            Legalese reduced
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Document Length
            </span>
            <FileText className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {insights.totalParagraphs} Paragraphs
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
            {insights.totalPages} Pages total
          </span>
        </div>
      </div>

      {/* Visual Analytics Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-center">
        {/* Recharts Bar */}
        <div className="lg:col-span-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-1.5">
            <BarChart className="w-4 h-4 text-indigo-500" /> Policy Clause Category Distribution
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Statutory Counters */}
        <div className="space-y-2">
          <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-red-900 dark:text-red-300">
              Critical Deadlines
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded-md">
              {insights.totalDeadlinesFound}
            </span>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
              Financial Penalties
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-amber-500 text-white rounded-md">
              {insights.totalPenalties}
            </span>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-900 dark:text-blue-300">
              Eligibility Rules
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-md">
              {insights.totalEligibilityRules}
            </span>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900 dark:text-emerald-300">
              Entitlements & Benefits
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-emerald-600 text-white rounded-md">
              {insights.totalBenefits}
            </span>
          </div>
        </div>
      </div>

      {/* Top 5 Most Important Things You Should Know Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Top 5 Most Important Things You Should Know
          </h3>
        </div>

        <div className="space-y-3">
          {insights.top5ImportantPoints?.map((item) => (
            <motion.div
              key={item.rank}
              whileHover={{ x: 2 }}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  #{item.rank}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {item.explanation}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="px-2 py-0.5 text-[10px] font-mono font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                  Para #{item.paragraphNumber}
                </span>
                <button
                  onClick={() => onGoToSource(item.paragraphNumber)}
                  className="px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1 border border-indigo-200 dark:border-indigo-800"
                >
                  View Clause <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
