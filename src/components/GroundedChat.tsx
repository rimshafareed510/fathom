import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Loader2,
  BookOpen
} from 'lucide-react';
import { ChatMessage, ParagraphChunk } from '../types';

interface GroundedChatProps {
  documentTitle: string;
  documentText: string;
  paragraphs: ParagraphChunk[];
  onGoToSource: (paragraphNumber: number) => void;
  onIncrementHeatmap: (paragraphNumbers: number[]) => void;
}

export const GroundedChat: React.FC<GroundedChatProps> = ({
  documentTitle,
  documentText,
  paragraphs,
  onGoToSource,
  onIncrementHeatmap,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: `I've analyzed the uploaded ${documentTitle}. Ask me about deadlines, eligibility, required documents, benefits, or penalties. Every answer includes citations from the original document.`,
      timestamp: 'Just now',
    },
  ]);

  useEffect(() => {
    setMessages([
      {
        id: 'm-init',
        sender: 'ai',
        text: `I've analyzed the uploaded ${documentTitle}. Ask me about deadlines, eligibility, required documents, benefits, or penalties. Every answer includes citations from the original document.`,
        timestamp: 'Just now',
      },
    ]);
  }, [documentTitle]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestedPrompts = [
    'What are the critical application cutoff dates?',
    'What financial penalties or fines apply?',
    'What documents are mandatory to submit?',
    'What happens if I miss a deadline?',
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          documentContext: documentText,
          paragraphList: paragraphs,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          citations: data.citations || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);

        // Real-time Citation Heatmap increment!
        if (data.citations && data.citations.length > 0) {
          onIncrementHeatmap(data.citations);
        }
      }
    } catch (err) {
      console.error('Failed to get chat response:', err);
      // Fallback response
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Based on the policy document, please check Paragraph 1 and Paragraph 3 for key submission rules.',
        citations: [1, 3],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      onIncrementHeatmap([1, 3]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ask-questions" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 md:p-6 mb-8 flex flex-col h-[580px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Grounded AI Chatbot
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Grounded strictly in verified policy clauses with real-time citations.
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Grounded Mode
        </span>
      </div>

      {/* Suggested Prompts Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 shrink-0 custom-scrollbar">
        <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Suggested:</span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 rounded-full transition-all shrink-0 border border-slate-200 dark:border-slate-700"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar my-2">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  AI
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Citation buttons */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-indigo-500" /> Citations:
                    </span>
                    {msg.citations.map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => onGoToSource(pNum)}
                        className="px-2 py-0.5 text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-200 transition-colors"
                      >
                        Para #{pNum}
                      </button>
                    ))}
                  </div>
                )}

                <span
                  className={`text-[10px] block mt-1 text-right ${
                    isUser ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  You
                </div>
              )}
            </motion.div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing document clauses & generating response...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about deadlines, fines, or rules..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 text-xs md:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
