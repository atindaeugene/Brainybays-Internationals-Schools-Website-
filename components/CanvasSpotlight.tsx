
import React from 'react';
import { Layout, CheckCircle, Video, Users } from 'lucide-react';

const CanvasSpotlight: React.FC = () => {
  const features = [
    { icon: Video, title: "Live Virtual Classes", desc: "Real-time, interactive lessons powered by BigBlueButton." },
    { icon: Layout, title: "Interactive Modules", desc: "Engaging multimedia content, not just PDFs, on Canvas." },
    { icon: CheckCircle, title: "Instant Feedback", desc: "Automated quizzes and detailed teacher feedback on assignments." },
    { icon: Users, title: "Parent Observer", desc: "Parents can link accounts to track progress in real-time." },
  ];

  return (
    <section id="why-online" className="scroll-mt-28 py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800 to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <div>
            <h2 className="text-brainy-red font-semibold tracking-wide uppercase text-sm mb-3">
              Powered by Technology
            </h2>
            <h3 className="text-4xl font-bold text-white mb-6">
              World-Class Learning via <span className="text-brainy-red">Canvas & BigBlueButton</span>
            </h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              We combine the industry-leading <strong>Canvas LMS</strong> with <strong>BigBlueButton</strong> to provide a complete digital campus. Access structured course resources 24/7, and join immersive, real-time interactive classes that go far beyond standard video calls.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-brainy-red/50 transition-colors">
                  <div className="shrink-0">
                    <item.icon className="w-6 h-6 text-brainy-red" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side - Mockup */}
          <div className="relative">
            {/* Abstract Browser Window Mockup */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 aspect-video group">
              {/* Window Controls */}
              <div className="h-8 bg-slate-900 flex items-center px-4 gap-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 w-64 h-4 bg-slate-800 rounded-full"></div>
              </div>
              
              {/* Canvas Interface Simulation */}
              <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-16 bg-brainy-red h-full flex flex-col items-center py-4 gap-6">
                   <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                   <div className="w-8 h-8 bg-white/10 rounded"></div>
                   <div className="w-8 h-8 bg-white/10 rounded"></div>
                   <div className="w-8 h-8 bg-white/10 rounded"></div>
                </div>
                {/* Main Content */}
                <div className="flex-1 bg-white p-6 relative">
                   <div className="w-full h-full absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: 'url(https://picsum.photos/800/600?random=1)'}}></div>
                   {/* Overlay UI elements */}
                   <div className="absolute top-6 left-6 right-6">
                      <div className="h-8 w-1/3 bg-slate-200 rounded mb-4"></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="aspect-video bg-slate-100 rounded shadow-sm border border-slate-200 flex items-center justify-center text-xs text-slate-400">Live Class</div>
                        <div className="aspect-video bg-slate-100 rounded shadow-sm border border-slate-200"></div>
                        <div className="aspect-video bg-slate-100 rounded shadow-sm border border-slate-200"></div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                 <div className="bg-blue-100 p-2 rounded-full">
                   <Video className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                   <div className="text-slate-900 font-bold text-sm">Live Class in Session</div>
                   <div className="text-slate-500 text-xs">BigBlueButton • Joined</div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CanvasSpotlight;