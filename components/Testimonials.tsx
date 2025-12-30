
import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Parent of Year 9 Student",
    quote: "Brainybay changed our lives. My daughter was struggling in a traditional setting, but the personalized attention on Canvas and the flexibility of online classes allowed her to thrive.",
    location: "Nairobi, Kenya"
  },
  {
    name: "Dr. James Ochieng",
    role: "A-Level Parent",
    quote: "As a busy professional, the Parent Observer role in Canvas is brilliant. I can see my son's progress and upcoming deadlines without having to ask. The Cambridge standards are world-class.",
    location: "Kampala, Uganda"
  },
  {
    name: "Elena V.",
    role: "IGCSE Student",
    quote: "The BigBlueButton classes are so interactive! I feel more connected to my teachers here than I ever did in my old physical school. Plus, I can re-watch recorded lessons anytime.",
    location: "Dar es Salaam, Tanzania"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,0,0.05),transparent)] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Quote className="w-12 h-12 text-brainy-red mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Voices of Our Community</h2>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-brainy-gold text-brainy-gold" />)}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <div className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
                    <p className="text-xl md:text-2xl text-slate-200 italic leading-relaxed mb-8">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-bold text-lg">{t.name}</h4>
                        <p className="text-brainy-red text-sm font-medium">{t.role}</p>
                        <p className="text-slate-500 text-xs mt-1">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prev}
              className="p-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-brainy-red transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-brainy-red' : 'w-2 bg-slate-700'}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-3 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-brainy-red transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
