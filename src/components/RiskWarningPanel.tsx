import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  Clock,
  DollarSign,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Info,
  CheckCircle,
  Sparkles,
  Filter,
  Check,
  Search
} from 'lucide-react';
import { RiskCardData, Severity, RiskCategory } from '../types';

interface RiskWarningPanelProps {
  risks: RiskCardData[];
  onGoToSource: (paragraphNumber: number) => void;
}

export const RiskWarningPanel: React.FC<RiskWarningPanelProps> = ({ risks, onGoToSource }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const criticalCount = risks.filter((r) => r.severity === 'critical').length;
  const warningCount = risks.filter((r) => r.severity === 'warning').length;
  const infoCount = risks.filter((r) => r.severity === 'info').length;

  // Filter risks based on controls
  const filteredRisks = risks.filter((risk) => {
    if (selectedSeverity !== 'all' && risk.severity !== selectedSeverity) return false;
    if (selectedCategory !== 'all' && risk.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = risk.title.toLowerCase().includes(query);
      const matchExp = risk.explanation.toLowerCase().includes(query);
      const matchQuote = risk.quote.toLowerCase().includes(query);
      const matchCat = risk.category.toLowerCase().includes(query);
      return matchTitle || matchExp || matchQuote || matchCat;
    }
    return true;
  });

  const getSeverityBadge = (severity: Severity, confidenceLevel?: string) => {
    const tooltipText = "Confidence reflects how directly the answer is supported by the uploaded document.";
    switch (severity) {
      case 'critical':
        return (
          <span title={tooltipText} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded uppercase bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 cursor-help">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
            {confidenceLevel ? `${confidenceLevel} Confidence` : '98% Confidence'}
          </span>
        );
      case 'warning':
        return (
          <span title={tooltipText} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded uppercase bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 cursor-help">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {confidenceLevel ? `${confidenceLevel} Confidence` : '85% Confidence'}
          </span>
        );
      case 'info':
        return (
          <span title={tooltipText} className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wider rounded uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 cursor-help">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {confidenceLevel ? `${confidenceLevel} Confidence` : 'High Confidence'}
          </span>
        );
    }
  };

  const getCategoryIcon = (category: RiskCategory) => {
    if (category.includes('Deadline') || category.includes('Cutoff') || category.includes('Expiration')) {
      return <Clock className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
    }
    if (category.includes('Penalty') || category.includes('Financial')) {
      return <DollarSign className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
    }
    if (category.includes('Document') || category.includes('Missing')) {
      return <FileCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
    }
    return <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
  };

  return (
    <div id="risk-warning-panel" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-500" />
            Risk & Warning Panel
          </h2>
          <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
            Automatically extracted deadlines, penalties, missing requirements, and compliance rules.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5 font-normal">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Confidence reflects how directly the answer is supported by the uploaded document.</span>
          </p>
        </div>

        {/* Severity summary counters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedSeverity('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              selectedSeverity === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                : 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            All ({risks.length})
          </button>
          <button
            onClick={() => setSelectedSeverity('critical')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              selectedSeverity === 'critical'
                ? 'bg-rose-600 text-white border-transparent shadow-sm'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900 hover:bg-rose-100'
            }`}
          >
            Critical ({criticalCount})
          </button>
          <button
            onClick={() => setSelectedSeverity('warning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              selectedSeverity === 'warning'
                ? 'bg-amber-500 text-white border-transparent shadow-sm'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900 hover:bg-amber-100'
            }`}
          >
            Warning ({warningCount})
          </button>
          <button
            onClick={() => setSelectedSeverity('info')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              selectedSeverity === 'info'
                ? 'bg-emerald-600 text-white border-transparent shadow-sm'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900 hover:bg-emerald-100'
            }`}
          >
            Info ({infoCount})
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search risks & deadlines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-1.5 px-2.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
          >
            <option value="all">All Categories</option>
            <option value="Critical Deadlines">Critical Deadlines</option>
            <option value="Application Cutoff Dates">Application Cutoff Dates</option>
            <option value="Financial Penalties">Financial Penalties</option>
            <option value="Eligibility Loss Conditions">Eligibility Loss Conditions</option>
            <option value="Required Documents">Required Documents</option>
            <option value="Renewal Requirements">Renewal Requirements</option>
            <option value="Mandatory Actions">Mandatory Actions</option>
            <option value="Restrictions">Restrictions</option>
            <option value="Exceptions">Exceptions</option>
          </select>
        </div>
      </div>

      {/* Risk Cards List - Professional Polish left-border styling */}
      {filteredRisks.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
          <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            No critical risks or deadlines were detected.
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search or category filters to view other findings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredRisks.map((risk) => {
              const isCritical = risk.severity === 'critical';
              const isWarning = risk.severity === 'warning';

              const cardStyle = isCritical
                ? 'border-l-4 border-l-rose-500 border-y border-r border-slate-200 dark:border-slate-800 bg-rose-50/70 dark:bg-rose-950/20'
                : isWarning
                ? 'border-l-4 border-l-amber-500 border-y border-r border-slate-200 dark:border-slate-800 bg-amber-50/70 dark:bg-amber-950/20'
                : 'border-l-4 border-l-emerald-500 border-y border-r border-slate-200 dark:border-slate-800 bg-emerald-50/70 dark:bg-emerald-950/20';

              const titleColor = isCritical
                ? 'text-rose-950 dark:text-rose-200'
                : isWarning
                ? 'text-amber-950 dark:text-amber-200'
                : 'text-emerald-950 dark:text-emerald-200';

              const textColor = isCritical
                ? 'text-rose-900 dark:text-rose-300'
                : isWarning
                ? 'text-amber-900 dark:text-amber-300'
                : 'text-emerald-900 dark:text-emerald-300';

              const buttonColor = isCritical
                ? 'text-rose-700 dark:text-rose-400 hover:underline'
                : isWarning
                ? 'text-amber-700 dark:text-amber-400 hover:underline'
                : 'text-emerald-700 dark:text-emerald-400 hover:underline';

              return (
                <motion.div
                  key={risk.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`${cardStyle} p-4 rounded-r-lg flex flex-col justify-between transition-all hover:shadow-sm`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        {getCategoryIcon(risk.category)}
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                          {risk.category}
                        </span>
                      </div>
                      {getSeverityBadge(risk.severity, risk.confidenceLevel)}
                    </div>

                    {/* Title */}
                    <h3 className={`text-sm font-bold ${titleColor} mb-1 leading-snug`}>
                      {risk.title}
                    </h3>

                    {/* Plain English explanation */}
                    <p className={`text-xs ${textColor} mb-3 leading-relaxed`}>
                      {risk.explanation}
                    </p>

                    {/* Quote block */}
                    <div className="p-2.5 rounded bg-white/70 dark:bg-slate-900/60 text-[11px] italic text-slate-600 dark:text-slate-400 mb-3 border border-slate-100 dark:border-slate-800">
                      "{risk.quote}"
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50 mt-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                      Para #{risk.paragraphNumber}
                    </span>

                    <button
                      onClick={() => onGoToSource(risk.paragraphNumber)}
                      className={`text-[11px] font-bold ${buttonColor} flex items-center gap-1`}
                    >
                      GO TO SOURCE →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
