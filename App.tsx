import * as React from 'react';
import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Curriculum from './components/Curriculum';
import CanvasSpotlight from './components/CanvasSpotlight';
import Admissions from './components/Admissions';
import Footer from './components/Footer';
import VoiceAgent from './components/VoiceAgent';
import GlobalCommunity from './components/GlobalCommunity';
import VideoTestimonials from './components/VideoTestimonials';

function App() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <div className="min-h-screen bg-brainy-navy text-slate-200 font-sans selection:bg-brainy-red selection:text-white">
      <Navigation onOpenApplication={() => setShowApplicationForm(true)} />
      
      <main>
        <Hero />
        <Curriculum />
        <GlobalCommunity />
        <CanvasSpotlight />
        <VideoTestimonials />
        <Admissions showForm={showApplicationForm} setShowForm={setShowApplicationForm} />
      </main>

      <Footer />
      <VoiceAgent />
    </div>
  );
}

export default App;