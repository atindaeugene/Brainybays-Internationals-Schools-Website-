
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import CanvasSpotlight from './components/CanvasSpotlight';
import Admissions from './components/Admissions';
import Footer from './components/Footer';
import VoiceAgent from './components/VoiceAgent';
import GlobalCommunity from './components/GlobalCommunity';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';

function App() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <div className="min-h-screen bg-brainy-navy text-slate-200 font-sans selection:bg-brainy-red selection:text-white">
      <Navigation onOpenApplication={() => setShowApplicationForm(true)} />
      
      <main>
        <Hero />
        <WhyChooseUs />
        <Curriculum />
        <GlobalCommunity />
        <CanvasSpotlight />
        <Admissions showForm={showApplicationForm} setShowForm={setShowApplicationForm} />
        <Contact />
      </main>

      <Footer />
      <VoiceAgent />
    </div>
  );
}

export default App;
    