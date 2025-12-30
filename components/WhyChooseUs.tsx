
import React, { useState, useEffect } from 'react';
import { Award, Wifi, Bot, Check, Globe, ShieldCheck, Sparkles, MessageCircle, Zap } from 'lucide-react';
import Button from './Button';

interface WhyChooseUsProps {
  onOpenAI?: () => void;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenAI }) => {
  const [activeUpdate, setActiveUpdate] = useState(0);
  
  const updates = [
    { text: "Math Quiz Due Tomorrow", type: "alert" },
    { text: "Physics Grade: A (92%)", type: "success" },
    { text: "New Assignment: History", type: "info" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUpdate((prev) => (prev + 1) % updates.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Award,
      color: "text-brainy-gold",
      title: "Cambridge Curriculum",
      description: "Globally recognized standards ensuring students are ready for the world's top universities.",
      points: ["IGCSE & A-Level Expertise", "Rigorous Academic Standards", "Global University Network"]
    },
    {
      icon: Wifi,
      color: "text-brainy-blue",
      title: "Digital-First Learning",
      description: "Optimized online delivery using Canvas LMS and BigBlueButton for 24/7 engagement.",
      points: ["Interactive Live Classes", "Anywhere Access", "Multimedia Resources"]
    },
    {
      icon: Bot,
      color: "text-brainy-red",
      title: "AI Study Partner",
      description: "Meet 'BB Assistant', our custom AI providing instant support and real-time academic news.",
      points: ["24/7 Question Answering", "Curriculum Navigation", "Live Exam Updates"],
      isAI: true
    },
    {
      icon: ShieldCheck,
      color: "text-green-500",
      title: "Verified Excellence",
      description: "Fully accredited online school with verified success rates in East Africa and beyond.",
      points: ["Accredited Educators", "Proven Success Record", "Safe Online Environment"]
    }
  ];

  return (
    <section className="py-24 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brainy-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brainy-red font-semibold tracking-wide uppercase text-sm mb-3">
            The Brainybay Advantage
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Why We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-brainy-gold to-white">Different</span>
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A fusion of traditional Cambridge excellence and futuristic digital pedagogy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`rounded-3xl p-8 border transition-all duration-500 group relative flex flex-col ${
                benefit.isAI 
                  ? 'bg-gradient-to-br from-slate-800 to-brainy-navy border-brainy-red/30 hover:border-brainy-red hover:shadow-2xl hover:shadow-brainy-red/20' 
                  : 'bg-slate-800/30 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
              }`}
            >
              {benefit.isAI && (
                <div className="absolute top-4 right-4 animate-pulse">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              )}

              {!benefit.isAI && (
                 <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <benefit.icon className="w-16 h-16 text-white" />
                 </div>
              )}
              
              <div className={`w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-inner border border-slate-700 relative z-10`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              
              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brainy-gold transition-colors">
                {benefit.title}
              </h4>
              
              <p className="text-slate-400 text-xs leading-relaxed mb-6 min-h-[48px]">
                {benefit.description}
              </p>

              {/* AI Interactive Feature */}
              {benefit.isAI ? (
                <div className="flex-grow flex flex-col justify-between">
                   <div className="bg-slate-950/80 rounded-xl p-3 mb-4 border border-slate-700/50 backdrop-blur overflow-hidden relative h-20">
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 opacity-70">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                         <span className="text-[9px] text-slate-400 uppercase tracking-wider">Live Updates</span>
                      </div>
                      <div className="mt-4">
                         {updates.map((update, i) => (
                           <div 
                              key={i} 
                              className={`flex items-center gap-2 transition-all duration-500 absolute w-full ${
                                i === activeUpdate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                              }`}
                           >
                              <Zap size={10} className={
                                update.type === 'alert' ? 'text-red-400' : 
                                update.type === 'success' ? 'text-green-400' : 'text-blue-400'
                              } />
                              <span className="text-xs text-slate-200 font-medium">{update.text}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <button 
                    onClick={onOpenAI}
                    className="w-full mt-auto py-2 bg-brainy-red/10 border border-brainy-red/50 rounded-lg text-brainy-red text-xs font-bold hover:bg-brainy-red hover:text-white transition flex items-center justify-center gap-2 group-hover:animate-pulse-slow"
                   >
                     <MessageCircle size={14} /> Try BB Assistant
                   </button>
                </div>
              ) : (
                <ul className="space-y-2 mt-auto">
                  {benefit.points.map((point, idx) => (
                    <li key={idx} className="flex items-center text-[10px] text-slate-300 font-medium">
                      <Check size={10} className="text-brainy-red mr-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
