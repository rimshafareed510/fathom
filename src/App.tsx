import React, { useState, useEffect } from 'react';
import { SAMPLE_POLICIES } from './data/samplePolicies';
import { PolicyDocument, ParagraphChunk } from './types';
import { Header } from './components/Header';
import { FirstTimeUserTour } from './components/FirstTimeUserTour';
import { RiskWarningPanel } from './components/RiskWarningPanel';
import { CitationHeatmap } from './components/CitationHeatmap';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { DocumentViewer } from './components/DocumentViewer';
import { GroundedChat } from './components/GroundedChat';
import { EligibilityChecker } from './components/EligibilityChecker';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Shield, Sparkles, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentPolicy, setCurrentPolicy] = useState<PolicyDocument>(SAMPLE_POLICIES[0]);
  const [highlightedParaNum, setHighlightedParaNum] = useState<number | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Check first-time user tour status in localStorage
  useEffect(() => {
    const tourDone = localStorage.getItem('policy_plainspeak_tour_completed');
    if (!tourDone) {
      setIsTourOpen(true);
    }
  }, []);

  // Update browser document title reactively whenever policy changes
  useEffect(() => {
    if (currentPolicy?.title) {
      document.title = `${currentPolicy.title} - Fathom Policy Intelligence`;
    }
  }, [currentPolicy?.title]);

  // Compute dynamic subtitle statistics for the banner
  const totalPages = currentPolicy.insights?.totalPages || Math.max(1, Math.ceil(currentPolicy.paragraphs.length / 5));
  const clauseCount = currentPolicy.paragraphs.length;
  const pageLabel = totalPages === 1 ? '1 page' : `${totalPages} pages`;
  const clauseLabel = clauseCount === 1 ? '1 clause' : `${clauseCount} clauses`;

  const formatUploadDate = (dateStr?: string) => {
    if (!dateStr) return 'Jul 27, 2026';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const dynamicSubtitle = `Successfully analyzed • ${pageLabel} • ${clauseLabel} • Uploaded ${formatUploadDate(currentPolicy.createdAt)}`;

  const handleCloseTour = () => {
    setIsTourOpen(false);
    localStorage.setItem('policy_plainspeak_tour_completed', 'true');
  };

  // Scroll to paragraph and highlight
  const handleGoToSource = (paraNum: number) => {
    setHighlightedParaNum(paraNum);
    setActiveTab('document');
    setTimeout(() => {
      const el = document.getElementById(`para-${paraNum}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Real-time increment citation counts for Citation Heatmap
  const handleIncrementHeatmap = (paraNums: number[]) => {
    setCurrentPolicy((prev) => {
      const updatedParagraphs = prev.paragraphs.map((p) => {
        if (paraNums.includes(p.paragraphNumber)) {
          return { ...p, referenceCount: p.referenceCount + 1 };
        }
        return p;
      });
      return { ...prev, paragraphs: updatedParagraphs };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16 md:pb-8">
      {/* Top Header Navigation */}
      <Header
        currentPolicy={currentPolicy}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onStartTour={() => setIsTourOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Document Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
              <BookOpen className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                  {currentPolicy.category}
                </span>
                <span className="text-xs text-slate-300">Added {currentPolicy.createdAt}</span>
              </div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
                {currentPolicy.title}
              </h1>
              <p className="text-xs md:text-sm text-indigo-200 mt-1 max-w-3xl leading-relaxed font-semibold">
                {dynamicSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold bg-white text-indigo-950 hover:bg-slate-100 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              Switch Policy <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Switcher Routing */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 1. AI INSIGHTS DASHBOARD */}
            <AIInsightsPanel
              insights={currentPolicy.insights}
              risks={currentPolicy.risks}
              onGoToSource={handleGoToSource}
            />

            {/* 2. RISK & WARNING PANEL */}
            <RiskWarningPanel
              risks={currentPolicy.risks}
              onGoToSource={handleGoToSource}
            />

            {/* 3. CITATION HEATMAP PANEL */}
            <CitationHeatmap
              paragraphs={currentPolicy.paragraphs}
              onSelectParagraph={handleGoToSource}
            />

            {/* 4. GROUNDED AI CHAT & 5. ELIGIBILITY CHECKER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <GroundedChat
                key={`chat-grid-${currentPolicy.id}`}
                documentTitle={currentPolicy.title}
                documentText={currentPolicy.rawText}
                paragraphs={currentPolicy.paragraphs}
                onGoToSource={handleGoToSource}
                onIncrementHeatmap={handleIncrementHeatmap}
              />

              <EligibilityChecker
                key={`eligibility-grid-${currentPolicy.id}`}
                questions={currentPolicy.eligibilityQuestions}
                onGoToSource={handleGoToSource}
              />
            </div>

            {/* 6. DOCUMENT CLAUSES */}
            <DocumentViewer
              title={currentPolicy.title}
              category={currentPolicy.category}
              paragraphs={currentPolicy.paragraphs}
              highlightedParaNum={highlightedParaNum}
            />
          </div>
        )}

        {activeTab === 'risks' && (
          <RiskWarningPanel
            risks={currentPolicy.risks}
            onGoToSource={handleGoToSource}
          />
        )}

        {activeTab === 'heatmap' && (
          <CitationHeatmap
            paragraphs={currentPolicy.paragraphs}
            onSelectParagraph={handleGoToSource}
          />
        )}

        {activeTab === 'chat' && (
          <GroundedChat
            key={`chat-tab-${currentPolicy.id}`}
            documentTitle={currentPolicy.title}
            documentText={currentPolicy.rawText}
            paragraphs={currentPolicy.paragraphs}
            onGoToSource={handleGoToSource}
            onIncrementHeatmap={handleIncrementHeatmap}
          />
        )}

        {activeTab === 'eligibility' && (
          <EligibilityChecker
            key={`eligibility-tab-${currentPolicy.id}`}
            questions={currentPolicy.eligibilityQuestions}
            onGoToSource={handleGoToSource}
          />
        )}

        {activeTab === 'document' && (
          <DocumentViewer
            title={currentPolicy.title}
            category={currentPolicy.category}
            paragraphs={currentPolicy.paragraphs}
            highlightedParaNum={highlightedParaNum}
          />
        )}
      </main>

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSelectPolicy={(newPolicy) => {
          setCurrentPolicy(newPolicy);
          setHighlightedParaNum(null);
        }}
      />

      {/* Onboarding Tour */}
      <FirstTimeUserTour
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenChat={() => setActiveTab('chat')}
      />
    </div>
  );
}
