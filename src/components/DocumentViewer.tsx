import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Search,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Tag,
  Eye,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ParagraphChunk } from '../types';

interface DocumentViewerProps {
  title: string;
  category: string;
  paragraphs: ParagraphChunk[];
  highlightedParaNum: number | null;
  onClearHighlight?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  title,
  category,
  paragraphs,
  highlightedParaNum,
  onClearHighlight
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [usePlainEnglish, setUsePlainEnglish] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Scroll to highlighted paragraph whenever highlightedParaNum changes
  useEffect(() => {
    if (highlightedParaNum !== null) {
      const el = document.getElementById(`para-${highlightedParaNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedParaNum]);

  const handleCopy = (num: number, text: string) => {
    navigator.clipboard.writeText(`[Paragraph ${num}]: ${text}`);
    setCopiedId(num);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredParagraphs = paragraphs.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.text.toLowerCase().includes(q) ||
      (p.simplifiedText && p.simplifiedText.toLowerCase().includes(q)) ||
      p.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div id="source-citations" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              {category}
            </span>
            <span className="text-xs text-slate-400">• {paragraphs.length} Clauses</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>

        {/* View mode toggle & Export Report */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setUsePlainEnglish(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !usePlainEnglish
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Original Document
            </button>
            <button
              onClick={() => setUsePlainEnglish(true)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                usePlainEnglish
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Plain English
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm"
            title={`Export PDF Report for ${title}`}
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-500" /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter document clauses by keyword or topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Paragraphs Stream */}
      <div className="space-y-4">
        {filteredParagraphs.map((para) => {
          const isHighlighted = highlightedParaNum === para.paragraphNumber;

          return (
            <motion.div
              key={para.paragraphNumber}
              id={`para-${para.paragraphNumber}`}
              animate={{
                scale: isHighlighted ? [1, 1.01, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
              className={`p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                isHighlighted
                  ? 'border-indigo-500 ring-2 ring-indigo-500/40 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-md ${
                      isHighlighted
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Paragraph {para.paragraphNumber}
                  </span>

                  {isHighlighted && (
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" /> Source Clause Highlighted
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(para.paragraphNumber, usePlainEnglish && para.simplifiedText ? para.simplifiedText : para.text)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Copy paragraph text"
                  >
                    {copiedId === para.paragraphNumber ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Text rendering */}
              <p className={`text-sm md:text-base leading-relaxed mb-3 ${
                usePlainEnglish ? 'text-indigo-950 dark:text-indigo-200 font-medium' : 'text-slate-800 dark:text-slate-200 font-normal'
              }`}>
                {usePlainEnglish && para.simplifiedText ? para.simplifiedText : para.text}
              </p>

              {/* Topics tags */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {para.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  {para.referenceCount} Citations
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
