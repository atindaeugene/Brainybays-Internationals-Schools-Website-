
import React from 'react';
import Button from './Button';
import { ChevronRight, Globe, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brainy-navy">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Diverse students learning online" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brainy-navy via-brainy-navy/95 to-brainy-navy"></div>
        
        {/* Dynamic Animated Orbs */}
        {/* Large Blue Blob - Top Left */}
        <div className="absolute top-[10%] left-[5%] w-[30rem] h-[30rem] bg-brainy-blue/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none"></div>
        
        {/* Medium Red Blob - Bottom Right */}
        <div className="absolute bottom-[10%] right-[5%] w-[25rem] h-[25rem] bg-brainy-red/15 rounded-full blur-[100px] animate-blob pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '18s' }}></div>
        
        {/* Small Gold Orb - Middle Right */}
        <div className="absolute top-1/2 right-[15%] w-64 h-64 bg-brainy-gold/10 rounded-full blur-[80px] animate-float-slow pointer-events-none"></div>
        
        {/* Small Navy Orb - Middle Left */}
        <div className="absolute bottom-[30%] left-[15%] w-80 h-80 bg-slate-400/5 rounded-full blur-[100px] animate-float pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-full px-4 py-1.5 mb-8 animate-[fadeIn_1s_ease-out]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brainy-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brainy-red"></span>
          </span>
          <span className="text-sm font-medium text-slate-300">Enrollment Open for 2025 Academic Year</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Cambridge Excellence. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brainy-red to-white">
            Fully Online.
          </span>
          <span className="block mt-2 text-4xl md:text-6xl text-slate-400">Globally Accessible.</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300 leading-relaxed">
          Accredited K-12 International Education delivered through the world-class 
          Canvas LMS and BigBlueButton. Limitless learning for the leaders of tomorrow.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href='#curriculum'}>
            Explore Our Programs <ChevronRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href='#admissions'}>
            Request Prospectus
          </Button>
        </div>

        {/* Stats / Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-10">
          <div className="flex flex-col items-center">
            <Globe className="w-8 h-8 text-brainy-red mb-3" />
            <span className="text-3xl font-bold text-white">45+</span>
            <span className="text-sm text-slate-400">Countries Represented</span>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-8 h-8 text-brainy-gold mb-3" />
            <span className="text-3xl font-bold text-white">100%</span>
            <span className="text-sm text-slate-400">Cambridge Accredited</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center bg-brainy-red rounded-full text-white font-bold text-xs mb-3">LMS</div>
            <span className="text-3xl font-bold text-white">24/7</span>
            <span className="text-sm text-slate-400">Access via Canvas</span>
          </div>
           <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">1:8</span>
            <span className="text-sm text-slate-400">Teacher-Student Ratio</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
