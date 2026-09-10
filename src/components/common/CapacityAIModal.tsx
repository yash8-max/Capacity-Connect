import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User as UserIcon, RefreshCw, ChevronRight } from 'lucide-react';
import { User, AIChatMessage } from '../../types';
import { AIService } from '../../services/aiService';

interface CapacityAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

export const CapacityAIModal: React.FC<CapacityAIModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Namaste ${currentUser.name}. I am **Capacity AI**, your intelligence and learning co-pilot for the India Meteorological Department (IMD) & MoES. How can I assist you with your ${currentUser.role.toLowerCase()} workflows today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isOpen) return null;

  const getRolePrompts = () => {
    if (currentUser.role === 'ADMIN') {
      return [
        'Which competencies currently have the largest training gaps?',
        'Which courses have the lowest completion rate across RMCs?',
        'Provide an executive summary of WMO alignment status.',
      ];
    } else if (currentUser.role === 'TRAINER') {
      return [
        'Which trainees need urgent academic intervention?',
        'Which training resources are most utilized this month?',
        'Generate 5 assessment questions for Radar Polarimetry.',
      ];
    } else {
      return [
        'What should I learn next to close my competency gaps?',
        'Why was "Climate Risk Assessment" recommended for me?',
        'Create a 4-week personalized learning plan for numerical modeling.',
      ];
    }
  };

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQuery('');
    setLoading(true);

    try {
      const response = await AIService.askCapacityAI(q, currentUser);
      setMessages((prev) => [...prev, response]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'I apologize, but I encountered an error connecting to the Gemini knowledge service. Please try your query again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-2xl w-full flex flex-col h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E5E4] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D3B66] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0F172A]">Capacity AI Assistant</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-[10px] font-bold uppercase font-mono">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-[#64748B]">Context-aware intelligent co-pilot for {currentUser.role.toLowerCase()}s</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border border-[#E7E5E4] text-[#64748B] hover:text-[#0F172A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Prompts */}
        <div className="px-6 py-3 bg-white border-b border-[#E7E5E4] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-[#94A3B8] uppercase shrink-0 font-mono">Suggested:</span>
          {getRolePrompts().map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSend(promptText)}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs text-[#57534E] hover:border-[#0D3B66] hover:text-[#0D3B66] whitespace-nowrap transition-all"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8F5]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#0D3B66] text-white' : 'bg-white border border-[#E7E5E4] text-[#2A7F7E]'
                }`}
              >
                {msg.sender === 'user' ? <UserIcon className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <div
                className={`max-w-lg p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0D3B66] text-white rounded-tr-xs'
                    : 'bg-white border border-[#E7E5E4] text-[#0F172A] rounded-tl-xs shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`block text-[10px] mt-2 font-mono ${
                    msg.sender === 'user' ? 'text-white/70 text-right' : 'text-[#94A3B8]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#E7E5E4] text-[#2A7F7E] flex items-center justify-center animate-spin">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="bg-white border border-[#E7E5E4] p-4 rounded-2xl text-xs text-[#64748B] shadow-xs">
                Capacity AI is analyzing institutional data and generating insights...
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-white border-t border-[#E7E5E4] flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask Capacity AI anything about ${currentUser.role.toLowerCase()} analytics, courses, or competencies...`}
            className="flex-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0F172A] outline-none focus:border-[#0D3B66]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !query.trim()}
            className="px-5 py-3 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#092b4d] disabled:opacity-50 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
