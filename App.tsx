import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import CanvasSpotlight from './components/CanvasSpotlight';
import Admissions from './components/Admissions';
import Footer from './components/Footer';
import VoiceAgent from './components/VoiceAgent';

function App() {
  return (
    <div className="min-h-screen bg-brainy-navy text-slate-200 font-sans selection:bg-brainy-red selection:text-white">
      <Navigation />
      
      <main>
        <Hero />
        <Curriculum />
        <CanvasSpotlight />
        <Admissions />
      </main>

      <Footer />
      <VoiceAgent />
    </div>
  );
}

export default App;