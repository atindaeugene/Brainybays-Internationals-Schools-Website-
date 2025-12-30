
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Sparkles, Volume2, Loader2, ExternalLink, Book, Calendar, Award, CheckCircle2, Clock, GraduationCap } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, GenerateContentResponse } from "@google/genai";
import { sendMessageToGemini, SYSTEM_INSTRUCTION, canvasFunctions } from '../services/geminiService';
import { canvasApi } from '../services/canvasService';
import { ChatMessage, LoadingState } from '../types';

type VoiceStatus = 'listening' | 'processing' | 'speaking';

interface ExtendedChatMessage extends ChatMessage {
    sources?: any[];
    lmsData?: any;
    lmsType?: 'assignments' | 'grades' | 'recommendations';
}

interface VoiceAgentProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ isOpen: controlledIsOpen, onToggle }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (onToggle) {
      onToggle(value);
    } else {
      setInternalIsOpen(value);
    }
  };

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('listening');
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm BB Assistant, your Brainybay study partner. I'm connected to your Canvas LMS. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, loading, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading === LoadingState.THINKING) return;

    const userMsg: ExtendedChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(LoadingState.THINKING);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const aiResponse = await sendMessageToGemini(textToSend, history);
      const parts = aiResponse.candidates?.[0]?.content?.parts || [];
      
      let toolResults = [];
      let lmsData = null;
      let lmsType: 'assignments' | 'grades' | 'recommendations' | undefined;

      // Check for function calls
      for (const part of parts) {
        if (part.functionCall) {
          const { name, args } = part.functionCall;
          setLoading(LoadingState.THINKING); // Keep showing thinking while fetching data

          if (name === 'fetch_canvas_assignments') {
            const data = await canvasApi.getAssignments();
            toolResults.push({ name, response: { result: data } });
            lmsData = data;
            lmsType = 'assignments';
          } else if (name === 'fetch_student_grades') {
            const data = await canvasApi.getGrades();
            toolResults.push({ name, response: { result: data } });
            lmsData = data;
            lmsType = 'grades';
          } else if (name === 'get_study_recommendations') {
            const data = await canvasApi.getRecommendations(args.interest);
            toolResults.push({ name, response: { result: data } });
            lmsData = data;
            lmsType = 'recommendations';
          }
        }
      }

      let finalContent = aiResponse.text;

      // If tools were used, we might want a second pass for a natural response
      if (toolResults.length > 0) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const finalResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            { role: 'user', parts: [{ text: `System Instruction: ${SYSTEM_INSTRUCTION}` }] },
            ...history,
            { role: 'user', parts: [{ text: textToSend }] },
            { role: 'model', parts: parts },
            { role: 'user', parts: toolResults.map(tr => ({
                functionResponse: { name: tr.name, response: tr.response }
            }))}
          ]
        });
        finalContent = finalResponse.text;
      }

      const modelMsg: ExtendedChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: finalContent || "I've processed your request.",
        lmsData,
        lmsType,
        sources: aiResponse.candidates?.[0]?.groundingMetadata?.groundingChunks,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: "I'm sorry, I encountered an error accessing your records. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(LoadingState.IDLE);
    }
  };

  const renderLmsContent = (msg: ExtendedChatMessage) => {
    if (!msg.lmsData) return null;

    if (msg.lmsType === 'assignments') {
      return (
        <div className="mt-3 space-y-2 w-full">
          <div className="flex items-center gap-2 text-xs font-bold text-brainy-gold uppercase tracking-wider mb-2">
            <Calendar size={12} /> Upcoming Assignments
          </div>
          {msg.lmsData.map((item: any) => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-brainy-red/50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-bold text-white leading-tight">{item.title}</span>
                {item.priority === 'high' && <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30">Urgent</span>}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><Clock size={10}/> Due: {item.dueDate}</span>
                <span className={`flex items-center gap-1 ${item.status === 'submitted' ? 'text-green-400' : 'text-slate-400'}`}>
                  {item.status === 'submitted' ? <CheckCircle2 size={10}/> : <Clock size={10}/>} {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (msg.lmsType === 'grades') {
      return (
        <div className="mt-3 grid grid-cols-2 gap-2 w-full">
           <div className="col-span-2 flex items-center gap-2 text-xs font-bold text-green-400 uppercase tracking-wider mb-1">
            <Award size={12} /> Academic Performance
          </div>
          {Object.entries(msg.lmsData).map(([subject, grade]: [string, any]) => (
            <div key={subject} className="bg-slate-800 border border-slate-700 rounded-lg p-2 flex justify-between items-center">
              <span className="text-xs text-slate-300 truncate pr-2">{subject}</span>
              <span className="text-sm font-black text-white">{grade}</span>
            </div>
          ))}
        </div>
      );
    }

    if (msg.lmsType === 'recommendations') {
      return (
        <div className="mt-3 space-y-2 w-full">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            <GraduationCap size={12} /> Personalized Pathways
          </div>
          {msg.lmsData.map((rec: any, idx: number) => (
            <div key={idx} className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-white">{rec.subject}</span>
                <span className="text-[10px] text-blue-400 font-medium px-1.5 py-0.5 bg-blue-500/10 rounded">{rec.level}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">{rec.reason}</p>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 glass-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-brainy-red/30 animate-in slide-in-from-bottom-5 duration-300">
          <div className={`p-4 flex justify-between items-center bg-gradient-to-r from-brainy-navy to-slate-800 relative overflow-hidden`}>
            <div className="flex items-center gap-3 z-10">
              <div className="bg-white p-1.5 rounded-full shadow"><Sparkles className={`w-4 h-4 text-brainy-red`} /></div>
              <div>
                <h3 className="font-bold text-white text-sm">BB Assistant</h3>
                <p className="text-white/80 text-xs flex items-center gap-1">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                   Canvas LMS Connected
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full p-1"><X className="w-5 h-5" /></button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-900/95 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brainy-red text-white rounded-br-none' : 'bg-slate-800 text-gray-100 rounded-bl-none border border-slate-700'}`}>
                  {msg.text}
                  {renderLmsContent(msg)}
                  {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap gap-2">
                        {msg.sources.map((s: any, idx: number) => (
                           s.web && (
                            <a key={idx} href={s.web.uri} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded hover:bg-white/20 transition">
                                <ExternalLink size={8} /> {s.web.title || 'Source'}
                            </a>
                           )
                        ))}
                      </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {loading === LoadingState.THINKING && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 flex gap-1 items-center">
                  <Loader2 className="w-3 h-3 text-brainy-red animate-spin" />
                  <span className="text-xs text-slate-400 ml-1">Accessing Canvas Records...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-slate-950 border-t border-slate-800">
             <div className="flex gap-2 items-center mb-2 overflow-x-auto pb-1 no-scrollbar">
                <button onClick={() => handleSend("Show my next assignments")} className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] text-slate-300 transition">Next Assignments</button>
                <button onClick={() => handleSend("What are my grades?")} className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] text-slate-300 transition">Check Grades</button>
                <button onClick={() => handleSend("Study advice for math")} className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-[10px] text-slate-300 transition">Study Advice</button>
             </div>
             <div className="flex gap-2 items-center">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                    placeholder="Ask about your course..." 
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brainy-red transition" 
                />
                <button 
                    onClick={() => handleSend()} 
                    disabled={loading === LoadingState.THINKING || !input.trim()} 
                    className="bg-brainy-red text-white rounded-full p-2 hover:bg-red-700 transition disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`rounded-full p-4 shadow-lg shadow-brainy-red/20 transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-slate-700 text-white' : 'bg-brainy-red text-white animate-bounce-slow'}`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <div className="relative"><MessageCircle className="w-8 h-8" /><div className="absolute -top-1 -right-1 w-3 h-3 bg-brainy-gold rounded-full border-2 border-brainy-red"></div></div>}
      </button>
    </div>
  );
};

export default VoiceAgent;
