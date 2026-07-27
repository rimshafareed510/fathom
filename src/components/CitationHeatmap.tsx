import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  BarChart3,
  TrendingUp,
  Tag,
  ArrowUpRight,
  Info,
  HelpCircle,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { ParagraphChunk } from '../types';

interface CitationHeatmapProps {
  paragraphs: ParagraphChunk[];
  onSelectParagraph: (paragraphNumber: number) => void;
}

export const CitationHeatmap: React.FC<CitationHeatmapProps> = ({ paragraphs, onSelectParagraph }) => {
  const [hoveredParagraph, setHoveredParagraph] = useState<ParagraphChunk | null>(null);

  if (!paragraphs || paragraphs.length === 0) return null;

  // Compute reference statistics
  const maxRef = Math.max(...paragraphs.map((p) => p.referenceCount), 1);
  const totalRef = paragraphs.reduce((sum, p) => sum + p.referenceCount, 0);
  const avgRetrieval = (totalRef / paragraphs.length).toFixed(1);

  // Sort to find most and least referenced sections
  const sorted = [...paragraphs].sort((a, b) => b.referenceCount - a.referenceCount);
  const mostReferenced = sorted[0];
  const leastReferenced = sorted[sorted.length - 1];

  // Consolidate topics
  const topicCounts: Record<string, number> = {};
  paragraphs.forEach((p) => {
    p.topics.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + p.referenceCount;
    });
  });
  const topTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([topic]) => topic);

  // Color Intensity function based on color scale:
  // Light Blue = Rarely referenced
  // Blue = Frequently referenced
  // Dark Blue = Highly referenced
  const getHeatColorStyle = (count: number) => {
    const ratio = count / maxRef;
    if (ratio >= 0.7) {
      return {
        bg: 'bg-indigo-900 text-white dark:bg-indigo-700',
        barBg: 'bg-indigo-900 dark:bg-indigo-600',
        border: 'border-indigo-950 dark:border-indigo-500',
        label: 'Highly Referenced (Dark Blue)',
      };
    } else if (ratio >= 0.35) {
      return {
        bg: 'bg-blue-600 text-white dark:bg-blue-500',
        barBg: 'bg-blue-600 dark:bg-blue-500',
        border: 'border-blue-700 dark:border-blue-400',
        label: 'Frequently Referenced (Blue)',
      };
    } else {
      return {
        bg: 'bg-sky-200 text-sky-900 dark:bg-sky-950 dark:text-sky-200',
        barBg: 'bg-sky-300 dark:bg-sky-800',
        border: 'border-sky-300 dark:border-sky-800',
        label: 'Rarely Referenced (Light Blue)',
      };
    }
  };

  return (
    <div id="citation-heatmap" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-blue-500" />
              Citation Heatmap
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900 animate-pulse">
              Live Updates
            </span>
          </div>
          <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
            Visualizing document clauses retrieved most often during AI grounded reasoning.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="font-bold text-[10px] uppercase text-slate-400">Heat Scale:</span>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <span className="w-2.5 h-2.5 rounded bg-sky-200 dark:bg-sky-800 border border-sky-300" />
            <span className="text-slate-600 dark:text-slate-400">Rarely</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <span className="w-2.5 h-2.5 rounded bg-blue-600 dark:bg-blue-500" />
            <span className="text-slate-600 dark:text-slate-400">Frequently</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <span className="w-2.5 h-2.5 rounded bg-indigo-900 dark:bg-indigo-600" />
            <span className="text-slate-600 dark:text-slate-400">Highly</span>
          </div>
        </div>
      </div>

      {/* Summary Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
            Most Referenced Section
          </span>
          <span className="text-base md:text-lg font-bold text-indigo-700 dark:text-indigo-400">
            Para #{mostReferenced?.paragraphNumber || 1} ({mostReferenced?.referenceCount || 0}x)
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
            Least Referenced Section
          </span>
          <span className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-300">
            Para #{leastReferenced?.paragraphNumber || 1} ({leastReferenced?.referenceCount || 0}x)
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
            Avg Retrieval Score
          </span>
          <span className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400">
            {avgRetrieval} citations/para
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
            Most Common Topics
          </span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {topTopics.map((topic, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Document Heatmap Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Vertical Document Map */}
        <div className="lg:col-span-2 space-y-2">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-500" /> Vertical Document Map (Click any section to inspect)
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {paragraphs.map((para) => {
              const style = getHeatColorStyle(para.referenceCount);
              const percentage = Math.round((para.referenceCount / maxRef) * 100);

              return (
                <div
                  key={para.paragraphNumber}
                  onMouseEnter={() => setHoveredParagraph(para)}
                  onClick={() => onSelectParagraph(para.paragraphNumber)}
                  className={`group relative p-3 rounded-xl border ${style.border} bg-white dark:bg-slate-800 hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-lg shrink-0 ${style.bg}`}
                    >
                      P{para.paragraphNumber}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          Paragraph {para.paragraphNumber}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          {para.referenceCount} references
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {para.text}
                      </p>
                    </div>
                  </div>

                  {/* Heat bar indicator */}
                  <div className="flex flex-col items-end gap-1 shrink-0 w-24">
                    <span className="text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-400">
                      {percentage}% intensity
                    </span>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${style.barBg} transition-all duration-500`}
                        style={{ width: `${Math.max(percentage, 8)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Hover details panel */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/80 sticky top-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-blue-500" /> Section Inspector
          </h4>

          {hoveredParagraph ? (
            <motion.div
              key={hoveredParagraph.paragraphNumber}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600 text-white">
                  Paragraph #{hoveredParagraph.paragraphNumber}
                </span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {hoveredParagraph.referenceCount} Total Citations
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Topics Discussed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hoveredParagraph.topics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Clause Excerpt:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  "{hoveredParagraph.text}"
                </p>
              </div>

              <button
                onClick={() => onSelectParagraph(hoveredParagraph.paragraphNumber)}
                className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Scroll to Paragraph #{hoveredParagraph.paragraphNumber} <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
              Hover over or click any paragraph in the vertical document map to inspect citations and topics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
