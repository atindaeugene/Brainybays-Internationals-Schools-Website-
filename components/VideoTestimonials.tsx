import * as React from 'react';
import { Play, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    role: "IGCSE Student (Year 11)",
    quote: "The flexibility of Brainybay allowed me to pursue my professional tennis training while maintaining straight A's. The teachers are incredibly supportive.",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "The Kamau Family",
    role: "Parents of Year 5 & Year 8 Students",
    quote: "We were initially hesitant about online schooling, but the engagement via Canvas and the regular updates from teachers have given us complete peace of mind.",
    thumbnail: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "David O.",
    role: "A-Level Graduate",
    quote: "Thanks to the rigorous Cambridge curriculum at Brainybay, I felt fully prepared for university. I was accepted into my first-choice engineering program.",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const VideoTestimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brainy-navy relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-brainy-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-brainy-red/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hear From Our Community</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real stories from students and parents who have transformed their educational journey with Brainybay.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 group hover:border-brainy-red transition-all duration-300 hover:shadow-2xl hover:shadow-brainy-navy/50 flex flex-col">
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-slate-950 group-hover:opacity-90 transition-opacity cursor-pointer overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={`Video thumbnail for ${item.name}`} 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                    <div className="w-12 h-12 bg-brainy-red rounded-full flex items-center justify-center pl-1 shadow-lg shadow-black/30">
                      <Play className="w-5 h-5 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-medium text-white">
                  2:45
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <p className="text-xs text-brainy-gold font-medium uppercase tracking-wider mt-1">{item.role}</p>
                    </div>
                    <Quote className="text-slate-700 w-6 h-6 rotate-180" />
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-slate-700 pl-4">
                  "{item.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;