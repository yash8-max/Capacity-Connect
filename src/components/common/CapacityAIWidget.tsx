import React, { useState } from 'react';
import { Sparkles, Bot, X, MessageSquare, Send, RefreshCw, ChevronUp, User as UserIcon } from 'lucide-react';
import { User, AIChatMessage } from '../../types';
import { AIService } from '../../services/aiService';

interface CapacityAIWidgetProps {
  currentUser: User;
}

export const CapacityAIWidget: React.FC<CapacityAIWidgetProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-widget',
      sender: 'assistant',
      text: `Namaste ${currentUser.name}. I am Capacity AI, your intelligence co-pilot for ${currentUser.role.toLowerCase()} workflows. Ask me anything about learning plans, competency gaps, or course analytics.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const getRolePrompts = () => {
    if (currentUser.role === 'ADMIN') {
      return [
        'Which competencies have the largest training gaps?',
        'Which courses have the lowest completion rate?',
      ];
    } else if (currentUser.role === 'TRAINER') {
      return [
        'Which trainees need urgent intervention?',
        'Generate 5 MCQs on Doppler Radar.',
      ];
    } else {
      return [
        'What should I learn next for promotion?',
        'Explain my competency gaps.',
      ];
    }
  };

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQuery('');
    setLoading(true);

    try {
      const resp = await AIService.askCapacityAI(q, currentUser);
      setMessages((prev) => [...prev, resp]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'I apologize, but I encountered an error connecting to Capacity AI knowledge service.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button on Bottom Left */}
      <div className="fixed left-5 bottom-6 z-50">
        {!isOpen && (
          <div className="relative flex items-center">
            {isHovered && (
              <div className="absolute left-16 bg-[#0F172A] text-white text-xs px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap font-medium animate-fade-in pointer-events-none">
                Ask Capacity AI
              </div>
            )}
            <button
              onClick={() => setIsOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-12 h-12 rounded-full bg-white border border-[#E7E5E4] shadow-xl flex items-center justify-center text-[#0F172A] hover:bg-[#FAF8F5] hover:scale-105 transition-all group relative overflow-hidden"
              aria-label="Ask Capacity AI"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0D3B66]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Bot className="w-6 h-6 text-[#0D3B66]" />
              <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#2A7F7E] border-2 border-white animate-pulse" />
            </button>
          </div>
        )}
      </div>

      {/* Expanded Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed left-5 bottom-6 z-50 w-96 max-w-[calc(100vw-40px)] h-[540px] bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-[#0D3B66] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif tracking-tight">Capacity AI Co-Pilot</h4>
                <p className="text-[10px] text-white/70 uppercase font-mono">Role: {currentUser.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Suggested Prompts */}
          <div className="px-3 py-2 bg-[#FAF8F5] border-b border-[#E7E5E4] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {getRolePrompts().map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E7E5E4] text-[11px] text-[#57534E] hover:border-[#0D3B66] hover:text-[#0D3B66] whitespace-nowrap transition-all shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    m.sender === 'user' ? 'bg-[#0D3B66] text-white' : 'bg-white border border-[#E7E5E4] text-[#2A7F7E]'
                  }`}
                >
                  {m.sender === 'user' ? <UserIcon className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0D3B66] text-white rounded-tr-xs'
                      : 'bg-white border border-[#E7E5E4] text-[#0F172A] rounded-tl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1.5 font-mono ${
                      m.sender === 'user' ? 'text-white/70 text-right' : 'text-[#94A3B8]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#64748B] italic p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2A7F7E]" />
                <span>Capacity AI is reasoning...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white border-t border-[#E7E5E4] flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about learning..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0D3B66]"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !query.trim()}
              className="p-2 rounded-xl bg-[#0D3B66] text-white hover:bg-[#092b4d] disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
