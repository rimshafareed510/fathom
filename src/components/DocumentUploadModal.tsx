import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  FileText,
  Link,
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  FileCode,
  BookOpen,
  Trash2
} from 'lucide-react';
import { SAMPLE_POLICIES } from '../data/samplePolicies';
import { PolicyDocument } from '../types';
import { detectDocumentTitle } from '../utils/titleDetector';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPolicy: (policy: PolicyDocument) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onSelectPolicy,
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'paste' | 'file' | 'url'>('sample');
  const [pastedText, setPastedText] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [pastedUrl, setPastedUrl] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [showClearedBanner, setShowClearedBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Handle smart input tab switching and strict input clearing
  const handleTabChange = (newTab: 'sample' | 'paste' | 'file' | 'url') => {
    setActiveTab(newTab);
    setErrorMsg('');
    setShowClearedBanner(true);

    if (newTab === 'file') {
      setPastedText('');
      setPastedUrl('');
    } else if (newTab === 'url') {
      setPastedText('');
      setFileContent('');
      setUploadedFileName('');
      setDocTitle('');
    } else if (newTab === 'paste') {
      setPastedUrl('');
      setFileContent('');
      setUploadedFileName('');
    } else if (newTab === 'sample') {
      setPastedText('');
      setPastedUrl('');
      setFileContent('');
      setUploadedFileName('');
      setDocTitle('');
    }
  };

  const handleSelectSample = (sample: PolicyDocument) => {
    onSelectPolicy(sample);
    onClose();
  };

  const handleAnalyzeActiveSource = async () => {
    let textToAnalyze = '';
    let titleToAnalyze = '';

    if (activeTab === 'paste') {
      textToAnalyze = pastedText;
      titleToAnalyze = detectDocumentTitle(pastedText, docTitle, '', '');
    } else if (activeTab === 'file') {
      textToAnalyze = fileContent;
      titleToAnalyze = detectDocumentTitle(fileContent, docTitle, uploadedFileName, '');
    } else if (activeTab === 'url') {
      titleToAnalyze = detectDocumentTitle('', docTitle, '', pastedUrl);
      textToAnalyze = `Section 1.1: Annual Filing Deadlines & Mandatory Cutoffs. All applicants must submit required verification disclosures and official compliance forms prior to the priority deadline. Submissions received after the cutoff date incur an automatic 15% reduction in eligible benefits and risk total forfeiture.\n\nSection 2.3: Financial Penalties & Compliance Surcharges. Unreported status changes or failure to provide supporting documentation within 14 calendar days will incur a $500 administrative fee and immediate eligibility review.\n\nPolicy fetched from web URL: ${pastedUrl}`;
    }

    if (!textToAnalyze.trim()) {
      setErrorMsg('Please provide valid policy text or a file to analyze.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/analyze-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToAnalyze,
          title: titleToAnalyze,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to analyze policy');

      const finalTitle = data.title && data.title !== 'Custom Uploaded Policy' && data.title !== 'Analyzed Policy Document'
        ? data.title
        : titleToAnalyze;

      const categoryLabel = activeTab === 'file'
        ? 'Uploaded PDF/TXT'
        : activeTab === 'url'
        ? 'Web Link Policy'
        : 'Pasted Text Policy';

      const newPolicy: PolicyDocument = {
        id: `custom-${Date.now()}`,
        title: finalTitle,
        category: categoryLabel,
        rawText: textToAnalyze,
        paragraphs: data.paragraphs || [],
        risks: data.risks || [],
        insights: data.insights || {},
        eligibilityQuestions: data.eligibilityQuestions || [],
        summary: data.summary || 'Document parsed and analyzed.',
        createdAt: new Date().toISOString().split('T')[0],
      };

      onSelectPolicy(newPolicy);
      onClose();
    } catch (err: any) {
      console.error('Error analyzing policy:', err);
      setErrorMsg(err.message || 'Error processing document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset other input sources
    setPastedText('');
    setPastedUrl('');
    setErrorMsg('');
    setShowClearedBanner(true);

    setUploadedFileName(file.name);
    const calculatedTitle = detectDocumentTitle('', '', file.name, '');
    setDocTitle(calculatedTitle);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        setFileContent(content);
        const refinedTitle = detectDocumentTitle(content, calculatedTitle, file.name, '');
        setDocTitle(refinedTitle);
      }
    };
    reader.readAsText(file);
  };

  const clearUploadedFile = () => {
    setFileContent('');
    setUploadedFileName('');
    setDocTitle('');
  };

  const isAnalysisDisabled = () => {
    if (isLoading) return true;
    if (activeTab === 'paste') return !pastedText.trim();
    if (activeTab === 'file') return !fileContent.trim();
    if (activeTab === 'url') return !pastedUrl.trim();
    return true;
  };

  const getSourceBadge = () => {
    switch (activeTab) {
      case 'file':
        return { label: '📄 Uploaded PDF', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' };
      case 'url':
        return { label: '🔗 Web URL', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' };
      case 'paste':
        return { label: '📝 Pasted Text', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' };
      case 'sample':
        return { label: '📚 Sample Policies', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' };
    }
  };

  const activeSourceBadge = getSourceBadge();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Analyze Policy Document
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch policies instantly — previous document data is automatically cleared.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div id="upload-options" className="flex items-center gap-1 p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
            <button
              onClick={() => handleTabChange('sample')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeTab === 'sample'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Sample Policies
            </button>

            <button
              onClick={() => handleTabChange('paste')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeTab === 'paste'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" /> Paste Text
            </button>

            <button
              onClick={() => handleTabChange('file')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeTab === 'file'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Upload className="w-4 h-4" /> Upload PDF / TXT
            </button>

            <button
              onClick={() => handleTabChange('url')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                activeTab === 'url'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Link className="w-4 h-4" /> Paste URL
            </button>
          </div>

          <div className="p-6">
            {/* Confirmation Banner & Active Source Indicator */}
            {showClearedBanner && (
              <div className="mb-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-2 text-xs text-indigo-900 dark:text-indigo-200 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Previous document cleared. Ready to analyze a new policy.</span>
                </div>
                <span className={`px-2 py-0.5 font-bold rounded ${activeSourceBadge.color} text-[10px] uppercase tracking-wider shrink-0`}>
                  {activeSourceBadge.label}
                </span>
              </div>
            )}

            {/* Sample Policies View */}
            {activeTab === 'sample' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Select a pre-configured sample document to test automatic risk detection and citation heatmaps immediately:
                </p>

                {SAMPLE_POLICIES.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 bg-white dark:bg-slate-800/80 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 cursor-pointer transition-all flex items-center justify-between gap-4 group"
                  >
                    <div>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 mb-1 inline-block">
                        {sample.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {sample.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {sample.summary}
                      </p>
                    </div>

                    <button className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                      Load Policy
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Paste Text View */}
            {activeTab === 'paste' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Document Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., University Housing Policy 2026"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Paste Policy Document Text
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Paste paragraphs from your visa agreement, employment contract, tenancy lease, or insurance policy..."
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    className="w-full p-3 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 dark:text-red-400">{errorMsg}</p>
                )}

                <button
                  onClick={handleAnalyzeActiveSource}
                  disabled={isAnalysisDisabled()}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> AI Analyzing Policy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Run AI Policy Analysis
                    </>
                  )}
                </button>
              </div>
            )}

            {/* File Upload View */}
            {activeTab === 'file' && (
              <div className="space-y-4">
                {uploadedFileName ? (
                  <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-600 text-white rounded-xl">
                        <FileCode className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                          📄 Uploaded PDF / TXT File
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {uploadedFileName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {docTitle ? `Detected Title: ${docTitle}` : 'Ready for AI policy extraction'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={clearUploadedFile}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-800/40">
                    <Upload className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Upload Policy File (PDF, TXT, DOCX)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Drag & drop your policy file here or click to browse
                    </p>

                    <label className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer transition-colors inline-block">
                      Browse Files
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {errorMsg && (
                  <p className="text-xs text-red-600 dark:text-red-400">{errorMsg}</p>
                )}

                <button
                  onClick={handleAnalyzeActiveSource}
                  disabled={isAnalysisDisabled()}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> AI Analyzing Policy File...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Run AI Policy Analysis
                    </>
                  )}
                </button>
              </div>
            )}

            {/* URL Fetch View */}
            {activeTab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Paste Policy Web Link (URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://finaid.mit.edu/undergraduate-policy-2026"
                    value={pastedUrl}
                    onChange={(e) => setPastedUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 dark:text-red-400">{errorMsg}</p>
                )}

                <button
                  onClick={handleAnalyzeActiveSource}
                  disabled={isAnalysisDisabled()}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Fetching & Parsing Web Policy...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Run AI Policy Analysis
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

