
import React from 'react';
import { Bell } from 'lucide-react';

const NewsTicker: React.FC = () => {
  return (
    <div className="bg-brainy-red text-white py-2 overflow-hidden relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="bg-brainy-red z-10 pr-4 flex items-center gap-2 font-bold text-xs uppercase tracking-wider shrink-0 shadow-[10px_0_20px_rgba(128,0,0,1)]">
          <Bell size={14} className="animate-swing" /> Updates
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex gap-16 text-sm font-medium">
            <span>📢 Admissions for the 2025 Academic Year are now OPEN! Apply today for Early Bird discounts.</span>
            <span>🏆 Brainybay students achieve 98% pass rate in latest IGCSE exams.</span>
            <span>🤖 Introducing "BB Assistant" - Our new AI-powered study companion available 24/7 on Canvas.</span>
            <span>📅 Next Virtual Open Day: Saturday, 15th November at 10:00 AM EAT.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
