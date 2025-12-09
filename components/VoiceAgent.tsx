import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Sparkles, Volume2, Phone, MessageSquare } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { sendMessageToGemini, SYSTEM_INSTRUCTION } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

const VoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'whatsapp'>('ai');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm BB Assistant, your instant study partner. Ask me about our Cambridge curriculum or how to log in!",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Visualizer Refs
  const analyserRef = useRef<AnalyserNode | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'ai') {
      scrollToBottom();
    }
  }, [messages, isOpen, isVoiceActive, activeTab]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopVoiceMode();
    };
  }, []);

  const handleTabChange = (tab: 'ai' | 'whatsapp') => {
    setActiveTab(tab);
    if (tab === 'whatsapp') {
      stopVoiceMode();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading === LoadingState.THINKING) return;

    // Stop voice mode if active when typing
    if (isVoiceActive) {
      stopVoiceMode();
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(LoadingState.THINKING);

    // Format history for Gemini
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(userMsg.text, history);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setLoading(LoadingState.IDLE);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Voice Mode Logic ---

  const startVoiceMode = async () => {
    try {
      setIsVoiceActive(true);
      
      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      nextStartTimeRef.current = 0;

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          // Explicitly empty transcription config to avoid invalid argument errors
        },
        callbacks: {
          onopen: () => {
            console.log('Voice session opened');
            if (!inputAudioContextRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(stream);
            
            // Setup Visualizer
            const analyser = inputAudioContextRef.current.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.5;
            analyserRef.current = analyser;
            source.connect(analyser);
            
            // Start Visualizer Loop
            const updateVisualizer = () => {
                if (analyserRef.current && visualizerRef.current) {
                    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                    analyserRef.current.getByteFrequencyData(dataArray);
                    
                    // Calculate average volume
                    const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    
                    // Apply to visual element (scale 1.0 to 1.5)
                    const scale = 1 + (volume / 255) * 0.8;
                    const opacity = 0.3 + (volume / 255) * 0.7;
                    
                    if (visualizerRef.current) {
                      visualizerRef.current.style.transform = `scale(${scale})`;
                      visualizerRef.current.style.opacity = opacity.toString();
                      visualizerRef.current.style.boxShadow = `0 0 ${volume / 5}px ${volume / 10}px rgba(128, 0, 0, 0.5)`;
                    }
                }
                animationFrameRef.current = requestAnimationFrame(updateVisualizer);
            };
            updateVisualizer();

            // Setup ScriptProcessor for sending data
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            analyser.connect(scriptProcessor); 
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createPcmBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            handleLiveMessage(message);
          },
          onclose: () => {
            console.log('Voice session closed');
            stopVoiceMode();
          },
          onerror: (err) => {
            console.error('Voice session error:', err);
            stopVoiceMode();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (error) {
      console.error('Failed to start voice mode:', error);
      setIsVoiceActive(false);
    }
  };

  const stopVoiceMode = () => {
    setIsVoiceActive(false);
    
    // Stop Animation Frame
    if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
    }

    // Stop Microphone
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    // Close Audio Contexts
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop all playing sources
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();

    // Close Session if possible
    sessionRef.current = null;
  };

  const toggleVoiceMode = () => {
    if (isVoiceActive) {
      stopVoiceMode();
    } else {
      startVoiceMode();
    }
  };

  const handleLiveMessage = async (message: LiveServerMessage) => {
    const serverContent = message.serverContent;
    
    if (serverContent) {
      if (serverContent.interrupted) {
        sourcesRef.current.forEach(source => {
           try { source.stop(); } catch(e) {}
        });
        sourcesRef.current.clear();
        if (audioContextRef.current) {
            nextStartTimeRef.current = audioContextRef.current.currentTime;
        }
      }
    }

    // Handle Audio Output
    const base64Audio = serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (base64Audio && audioContextRef.current) {
        try {
            const audioData = decode(base64Audio);
            const audioBuffer = await decodeAudioData(
                audioData, 
                audioContextRef.current,
                24000,
                1
            );
            
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            
            source.onended = () => {
                sourcesRef.current.delete(source);
            };

            const currentTime = audioContextRef.current.currentTime;
            const startTime = Math.max(nextStartTimeRef.current, currentTime);
            source.start(startTime);
            nextStartTimeRef.current = startTime + audioBuffer.duration;
            
            sourcesRef.current.add(source);
        } catch (e) {
            console.error("Error decoding audio", e);
        }
    }
  };

  // --- Audio Utils ---
  
  function createPcmBlob(data: Float32Array): { data: string, mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = Math.max(-1, Math.min(1, data[i])) * 0x7FFF;
    }
    const bytes = new Uint8Array(int16.buffer);
    
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return {
      data: btoa(binary),
      mimeType: 'audio/pcm;rate=16000',
    };
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
            channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 glass-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-brainy-red/30 animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brainy-navy to-slate-900 border-b border-white/10">
            {/* Top Bar */}
            <div className="p-4 flex justify-between items-center relative overflow-hidden">
                {/* Visualizer Background Ring (only visible in voice mode) */}
                <div 
                ref={visualizerRef}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500/30 pointer-events-none transition-all duration-75 z-0"
                style={{ opacity: 0 }}
                />

                <div className="flex items-center gap-3 z-10">
                    <div className="bg-white p-1.5 rounded-full relative shadow">
                        <Sparkles className={`w-4 h-4 ${isVoiceActive ? 'text-red-500' : 'text-brainy-red'}`} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Brainybay Support</h3>
                        <p className="text-white/60 text-[10px] flex items-center gap-1">
                        {isVoiceActive ? (
                            <>
                                <Volume2 className="w-3 h-3 animate-pulse text-red-400" />
                                <span className="text-red-300 font-medium">Listening...</span>
                            </>
                        ) : (
                            'Online'
                        )}
                        </p>
                    </div>
                </div>
                <button 
                onClick={() => {
                    stopVoiceMode();
                    setIsOpen(false);
                }}
                className="text-white hover:bg-white/20 rounded-full p-1 transition z-10"
                >
                <X className="w-5 h-5" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex text-sm font-medium">
                <button 
                    onClick={() => handleTabChange('ai')}
                    className={`flex-1 py-2 text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'border-brainy-red text-white bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                    <Sparkles className="w-3 h-3" /> AI Assistant
                </button>
                <button 
                    onClick={() => handleTabChange('whatsapp')}
                    className={`flex-1 py-2 text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${activeTab === 'whatsapp' ? 'border-green-500 text-white bg-white/5' : 'border-transparent text-slate-400 hover:text-white'}`}
                >
                    <Phone className="w-3 h-3" /> WhatsApp
                </button>
            </div>
          </div>

          {/* Body Content */}
          {activeTab === 'ai' ? (
              <>
                {/* Messages Area */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-900/90 scrollbar-thin scrollbar-thumb-slate-700">
                    {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-brainy-red text-white rounded-br-none' 
                            : 'bg-slate-700 text-gray-100 rounded-bl-none border border-slate-600'
                        }`}
                        >
                        {msg.text}
                        </div>
                    </div>
                    ))}
                    {loading === LoadingState.THINKING && !isVoiceActive && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none border border-slate-600 flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2 items-center">
                    <button 
                        onClick={toggleVoiceMode}
                        className={`transition p-2 rounded-full ${isVoiceActive ? 'bg-red-500/20 text-red-500 ring-2 ring-red-500/50' : 'text-gray-400 hover:text-brainy-red hover:bg-slate-800'}`}
                        title={isVoiceActive ? "Stop Voice Mode" : "Start Voice Mode"}
                    >
                    {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={isVoiceActive ? "Listening..." : "Type your question..."}
                    disabled={isVoiceActive}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brainy-red transition disabled:opacity-50 disabled:cursor-not-allowed placeholder-slate-500"
                    />
                    <button 
                    onClick={handleSend}
                    disabled={loading === LoadingState.THINKING || !input.trim() || isVoiceActive}
                    className="bg-brainy-red text-white rounded-full p-2 hover:bg-red-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    <Send className="w-4 h-4" />
                    </button>
                </div>
              </>
          ) : (
              // WhatsApp Tab Content
              <div className="h-[380px] bg-slate-900 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/30">
                      <MessageSquare className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Chat with Admissions</h3>
                  <p className="text-slate-400 text-sm mb-8 max-w-[240px]">
                      Connect directly with our admissions team on WhatsApp for instant support.
                  </p>
                  
                  <a 
                    href="https://wa.me/254720066035?text=Hello%20Brainybay%2C%20I%20would%20like%20to%20enquire%20about%20admissions."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-green-900/20"
                  >
                      <MessageCircle className="w-5 h-5" />
                      Open WhatsApp
                  </a>
                  
                  <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      Typical reply time: 5 minutes
                  </div>
              </div>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-4 shadow-xl shadow-brainy-red/20 transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/10 ${
          isOpen ? 'bg-slate-800 text-white' : 'bg-brainy-red text-white'
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </button>
    </div>
  );
};

export default VoiceAgent;