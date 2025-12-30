
import React from 'react';
import { Megaphone, ArrowUpRight } from 'lucide-react';

const NewsTicker: React.FC = () => {
  const news = [
    "Admissions for Jan 2025 intake are now 85% full. Apply today!",
    "Brainybay students achieve 98% A*-C in recent IGCSE results.",
    "Upcoming Webinar: 'Navigating Cambridge A-Levels' - Dec 15th.",
    "Canvas LMS Maintenance scheduled for Sunday 2AM GMT."
  ];

  return (
    <div className="bg-brainy-red py-2 px-4 overflow-hidden relative z-50">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mr-4 shrink-0">
          <Megaphone size={12} /> Live Updates
        </div>
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...news, ...news].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-medium text-white/90">
              {item} <ArrowUpRight size={12} className="text-white/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
