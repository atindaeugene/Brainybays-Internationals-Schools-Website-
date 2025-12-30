
import React from 'react';
import { Quote, Star, MapPin } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Parent of Year 8 Student",
    location: "Mombasa, Kenya",
    quote: "Brainybay has transformed how my son learns. The combination of live classes and the Canvas platform means he never falls behind. It's truly world-class education from home."
  },
  {
    name: "David K.",
    role: "IGCSE Student",
    location: "Kampala, Uganda",
    quote: "I was worried about online schooling, but the teachers are so engaging. The AI study partner helps me late at night when I'm revising for exams. I feel fully prepared."
  },
  {
    name: "Priya Patel",
    role: "A-Level Student",
    location: "London, UK (Expat)",
    quote: "Transitioning from a physical school was seamless. The Cambridge curriculum is rigorous, and the flexibility allows me to pursue my tennis training alongside my studies."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brainy-navy relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brainy-gold font-semibold tracking-wide uppercase text-sm mb-3">
            Community Voices
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Families
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-brainy-gold/30 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="mb-6">
                <Quote className="w-10 h-10 text-brainy-red opacity-50" />
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <div className="text-xs text-brainy-gold mb-1">{item.role}</div>
                  <div className="flex items-center text-[10px] text-slate-500">
                    <MapPin size={10} className="mr-1" /> {item.location}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-brainy-gold fill-brainy-gold" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
