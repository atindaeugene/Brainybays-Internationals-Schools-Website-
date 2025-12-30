
import React, { useState, useEffect } from 'react';
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
import EnrollmentTrends from './components/EnrollmentTrends';
import Testimonials from './components/Testimonials';
import NewsTicker from './components/NewsTicker';
import ScrollReveal from './components/ScrollReveal';

function App() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false);

  useEffect(() => {
    // Reveal the site content
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      const timer = setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brainy-navy text-slate-200 font-sans selection:bg-brainy-red selection:text-white">
      <NewsTicker />
      <Navigation onOpenApplication={() => setShowApplicationForm(true)} />
      
      <main>
        <Hero />
        
        <ScrollReveal threshold={0.2}>
          <WhyChooseUs onOpenAI={() => setIsVoiceAgentOpen(true)} />
        </ScrollReveal>

        <ScrollReveal threshold={0.1}>
          <Curriculum />
        </ScrollReveal>

        <ScrollReveal threshold={0.2}>
          <GlobalCommunity />
        </ScrollReveal>

        <ScrollReveal threshold={0.1}>
          <EnrollmentTrends />
        </ScrollReveal>

        <ScrollReveal threshold={0.2}>
          <Testimonials />
        </ScrollReveal>

        <ScrollReveal threshold={0.1}>
          <CanvasSpotlight />
        </ScrollReveal>

        <ScrollReveal threshold={0.1}>
          <Admissions showForm={showApplicationForm} setShowForm={setShowApplicationForm} />
        </ScrollReveal>

        <ScrollReveal threshold={0.1}>
          <Contact />
        </ScrollReveal>
      </main>

      <Footer />
      <VoiceAgent isOpen={isVoiceAgentOpen} onToggle={setIsVoiceAgentOpen} />
    </div>
  );
}

export default App;
