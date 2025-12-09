import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { CurriculumLevel } from '../types';

const levels: CurriculumLevel[] = [
  {
    title: "Primary",
    age: "Ages 5-11",
    description: "Building strong foundations in English, Math, and Science through inquiry-based learning.",
    features: ["Cambridge Primary Checkpoint", "Holistic Development", "Game-based Learning"]
  },
  {
    title: "Lower Secondary",
    age: "Ages 11-14",
    description: "Developing skills and understanding in English, Mathematics, and Science for the first significant transition.",
    features: ["Cambridge Lower Secondary", "Critical Thinking", "Global Perspectives"]
  },
  {
    title: "IGCSE",
    age: "Ages 14-16",
    description: "The world's most popular international qualification for 14 to 16 year olds. Rigorous and flexible.",
    features: ["70+ Subjects", "Recognized Globally", "Exam Preparation Focus"]
  },
  {
    title: "AS & A Level",
    age: "Ages 16-19",
    description: "The gold standard for university entry. Deep subject knowledge and independent research skills.",
    features: ["University Preparation", "Specialized Study", "Accepted by Ivy League/Oxbridge"]
  },
];

const Curriculum: React.FC = () => {
  return (
    <section id="curriculum" className="scroll-mt-28 py-24 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Cambridge Pathway</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A seamless journey from primary to pre-university, recognized by the world's best universities and employers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level, index) => (
            <div 
              key={level.title} 
              className="group relative bg-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-brainy-red transition-all duration-300 hover:shadow-2xl hover:shadow-brainy-red/10 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl font-bold text-white">{index + 1}</span>
              </div>
              
              <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-brainy-red mb-4">
                {level.age}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{level.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed min-h-[80px]">
                {level.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {level.features.map(feature => (
                  <li key={feature} className="flex items-center text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 bg-brainy-gold rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#" className="inline-flex items-center text-brainy-red text-sm font-medium hover:text-white transition-colors">
                View Subjects <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;