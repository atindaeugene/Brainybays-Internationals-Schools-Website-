import * as React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="scroll-mt-28 bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-white">Brainybay</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Empowering students globally with the prestigious Cambridge curriculum through cutting-edge technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brainy-red transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-brainy-red transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-brainy-red transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brainy-red transition"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brainy-red transition">Our Curriculum</a></li>
              <li><a href="#" className="hover:text-brainy-red transition">Tuition & Fees</a></li>
              <li><a href="#" className="hover:text-brainy-red transition">Admissions Process</a></li>
              <li><a href="#" className="hover:text-brainy-red transition">Canvas LMS Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brainy-red shrink-0" /> 
                <a href="mailto:brainy@brainybayschools.com" className="hover:text-white transition">brainy@brainybayschools.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brainy-red shrink-0" /> 
                <a href="tel:+254720066035" className="hover:text-white transition">+254 720 066 035</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-brainy-red mt-1 shrink-0" /> 
                <span>The Crescent Business Center,<br/>Westlands 6th Floor, Suite 14</span>
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-4">Accreditation</h4>
             <div className="bg-white p-4 rounded-lg inline-block">
               {/* Placeholder for Cambridge Logo */}
               <div className="text-brainy-navy font-bold text-xs text-center border border-brainy-navy px-2 py-1">
                 Cambridge Assessment <br/> International Education
               </div>
               <div className="text-[10px] text-center text-brainy-navy mt-1">Cambridge International School</div>
             </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>&copy; {new Date().getFullYear()} Brainybay International Schools. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;