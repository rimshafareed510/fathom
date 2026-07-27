import React from 'react';
import {
  BarChart2,
  ShieldAlert,
  Flame,
  MessageSquare,
  CheckSquare,
  FileText
} from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenChat,
}) => {
  return (
    <>
      {/* Floating Action Button for Chat on Mobile */}
      <button
        onClick={onOpenChat}
        className="md:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-indigo-600 text-white shadow-xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all"
        aria-label="Open Grounded AI Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Bottom Sticky Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center w-14 h-11 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'dashboard'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-5 h-5 mb-0.5" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('risks')}
          className={`flex flex-col items-center justify-center w-14 h-11 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'risks'
              ? 'text-red-600 dark:text-red-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-5 h-5 mb-0.5 text-red-500" />
          <span>Risks</span>
        </button>

        <button
          onClick={() => setActiveTab('heatmap')}
          className={`flex flex-col items-center justify-center w-14 h-11 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'heatmap'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Flame className="w-5 h-5 mb-0.5 text-blue-500" />
          <span>Heatmap</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center justify-center w-14 h-11 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'chat'
              ? 'text-violet-600 dark:text-violet-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span>AI Chat</span>
        </button>

        <button
          onClick={() => setActiveTab('eligibility')}
          className={`flex flex-col items-center justify-center w-14 h-11 rounded-lg text-[10px] font-semibold transition-colors ${
            activeTab === 'eligibility'
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-5 h-5 mb-0.5" />
          <span>Eligibility</span>
        </button>
      </nav>
    </>
  );
};
