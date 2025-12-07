import React from 'react';
import Button from './Button';

const Admissions: React.FC = () => {
  const steps = [
    { title: "Application", desc: "Submit the online form and upload school reports." },
    { title: "Assessment", desc: "Short online placement test to determine level." },
    { title: "Enrollment", desc: "Receive offer, pay fees, and access Canvas." }
  ];

  return (
    <section id="admissions" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12">Start Your Journey in 3 Simple Steps</h2>
        
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-brainy-red flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-brainy-red/30">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-brainy-navy p-8 rounded-2xl border border-slate-700 inline-block max-w-2xl w-full">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Apply?</h3>
          <p className="text-slate-400 mb-6">Our admissions team is ready to help you navigate the process.</p>
          <div className="flex justify-center gap-4">
             <Button variant="primary">Start Application</Button>
             <Button variant="secondary">Download Fees</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;