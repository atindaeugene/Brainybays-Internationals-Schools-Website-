
import React from 'react';
import { Award, Wifi, Bot, Check } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      color: "text-brainy-gold",
      title: "Prestigious Cambridge Curriculum",
      description: "We provide the globally recognized Cambridge International curriculum, ensuring your child's education is accepted by leading universities worldwide.",
      points: ["IGCSE & A-Level Qualifications", "Rigorous Academic Standards", "Global University Acceptance"]
    },
    {
      icon: Wifi,
      color: "text-brainy-blue",
      title: "Flexible Online Learning",
      description: "Education that fits your lifestyle. Students can learn from the safety and comfort of their home, anywhere in the world, without compromising quality.",
      points: ["Study from Home Safety", "Flexible Scheduling", "No Commuting Stress"]
    },
    {
      icon: Bot,
      color: "text-brainy-red",
      title: "AI-Powered Support",
      description: "Our custom 'BB Assistant' provides instant, 24/7 support for students, helping with course navigation, FAQs, and study resources instantly.",
      points: ["24/7 Instant Answers", "Personalized Study Help", "Voice-Activated Interface"]
    }
  ];

  return (
    <section className="py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brainy-red font-semibold tracking-wide uppercase text-sm mb-3">
            The Brainybay Advantage
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Brainybay Online?
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We combine tradition with innovation to deliver an education that prepares students for the future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-brainy-red/50 hover:bg-slate-800 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-slate-700`}>
                <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brainy-red transition-colors">
                {benefit.title}
              </h4>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {benefit.description}
              </p>

              <ul className="space-y-3">
                {benefit.points.map((point, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center mr-3 border border-slate-700 shrink-0">
                      <Check size={10} className="text-brainy-gold" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
