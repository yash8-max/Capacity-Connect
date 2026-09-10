import React, { useState } from 'react';
import { Cpu, Send, Sparkles, User, Bot, CheckCircle2, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { AIChatMessage, User as UserType } from '../../types';
import { AIService } from '../../services/aiService';

interface CapacityAISectionProps {
  currentUser?: UserType | null;
  onNavigateAction?: (action: string) => void;
}

export const CapacityAISection: React.FC<CapacityAISectionProps> = ({
  currentUser,
  onNavigateAction,
}) => {
  const safeUser = currentUser || {
    id: 'trainee-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@imd.gov.in',
    role: 'TRAINEE' as const,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    designation: 'Meteorologist Grade-II',
    department: 'NWFC Forecasting Division',
    organization: 'India Meteorological Department (IMD)',
    location: 'New Delhi',
    joinedDate: '2023-01-15',
    traineeProfile: {
      employeeCode: 'IMD-TR-1042',
      batchYear: 2023,
      cadre: 'Meteorological Service Cadre Gr-II',
      currentStation: 'RMC New Delhi',
      completedCoursesCount: 4,
      activeEnrollmentsCount: 2,
      totalCertificatesCount: 3,
      learningHours: 48,
      competencyLevel: 'Intermediate',
      learningInterests: ['Doppler Radar', 'Numerical Weather Prediction']
    }
  };
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'What should I learn next?',
      timestamp: '10:14 AM',
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: 'Based on your current competencies, completed courses in Python & Cyclones, and operational forecasting responsibilities at Kolkata RMC, I recommend **Machine Learning for Weather Prediction**.\n\n**92% Match**\n\n**Why this recommendation?**\n✓ Matches your Python competency (82% Advanced)\n✓ Directly addresses your critical Machine Learning gap (-53% deficit)\n✓ Aligns with IMD national forecasting automation directives\n✓ Taught by Dr. Rajesh Kumar (Head of NWP, New Delhi)',
      timestamp: '10:14 AM',
      metadata: {
        recommendationMatch: 92,
        reasons: [
          'Matches your Python competency',
          'Addresses your machine learning gap',
          'Relevant to your learning interests',
          'Suitable for your current level',
        ],
        suggestedActions: [
          { label: 'View Course Syllabus', action: 'view_course_ml' },
          { label: 'Inspect Skill Gaps', action: 'view_skill_gaps' },
        ],
      },
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const promptShortcuts = [
    'What should I learn next?',
    'Explain numerical weather prediction',
    'Who is the best trainer for radar meteorology?',
    'What is my biggest competency gap?',
    'Create a 30-day learning plan',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const assistantMsg = await AIService.askCapacityAI(query, safeUser);
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: 'Capacity AI is momentarily synchronizing with the central institutional registry. Please try again or inspect courses directly.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF6E2] text-[#9E7318] text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Server-Side Grounded AI Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Capacity AI: Your Intelligent Learning Companion
          </h2>
          <p className="text-base text-[#57534E] mt-3">
            Instant scientific explanations, personalized curriculum routing, and objective career roadmap guidance grounded in verified MoES and IMD data.
          </p>
        </div>

        {/* The AI Chat Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E7E5E4] shadow-xl overflow-hidden flex flex-col h-[640px]">
          {/* Top Bar of Chat */}
          <div className="px-6 py-4 bg-[#0D3B66] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold">CAPACITY AI</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-200 uppercase font-mono">Verified IMD Grounding</span>
                </div>
                <p className="text-[11px] text-white/70">
                  Active Context: {safeUser?.name || 'Guest'} ({safeUser?.role || 'User'})
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-white/80">
              <span className="px-2.5 py-1 rounded-md bg-white/10 font-mono text-[11px]">
                Gemini 3.8 Flash
              </span>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[#FAF8F5]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user'
                      ? 'bg-[#0D3B66] text-white'
                      : 'bg-[#2A7F7E] text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs text-left ${
                    msg.sender === 'user'
                      ? 'bg-[#0D3B66] text-white rounded-tr-none'
                      : 'bg-white text-[#0F172A] border border-[#E7E5E4] rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Optional structured badges / match score */}
                  {msg.metadata?.recommendationMatch && (
                    <div className="mt-3 pt-3 border-t border-[#E7E5E4] flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F3F1] text-[#2A7F7E] text-xs font-bold font-mono">
                        {msg.metadata.recommendationMatch}% Match
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        Calculated by Deterministic Skill Gap Matrix
                      </span>
                    </div>
                  )}

                  {/* Quick Action Pills if available */}
                  {msg.metadata?.suggestedActions && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2">
                      {msg.metadata.suggestedActions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => onNavigateAction?.(act.action)}
                          className="px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#CBD5E1] text-[11px] font-semibold text-[#0D3B66] hover:bg-[#EBF2F7] transition-colors"
                        >
                          {act.label} →
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      msg.sender === 'user' ? 'text-white/60 text-right' : 'text-[#94A3B8]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[80%] items-center text-xs text-[#64748B]">
                <div className="w-8 h-8 rounded-full bg-[#2A7F7E] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E7E5E4] rounded-tl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#0D3B66]" />
                  <span>Capacity AI is consulting verified institutional records...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Shortcuts */}
          <div className="px-6 py-2.5 bg-white border-t border-[#E7E5E4] overflow-x-auto flex items-center gap-2 text-xs no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider whitespace-nowrap">
              Suggestions:
            </span>
            {promptShortcuts.map((shortcut, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(shortcut)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] text-[11px] font-medium text-[#57534E] hover:text-[#0D3B66] hover:border-[#0D3B66]/40 hover:bg-[#F5F0E8] whitespace-nowrap transition-colors"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <div className="p-4 bg-white border-t border-[#E7E5E4]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Capacity AI about courses, trainers, NWP physics, or radar diagnostics..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#0D3B66] focus:ring-1 focus:ring-[#0D3B66] bg-[#FAF8F5]/60"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-3 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#082947] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};