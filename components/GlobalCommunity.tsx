
import React from 'react';
import { MapPin } from 'lucide-react';

const GlobalCommunity: React.FC = () => {
  const students = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1589330694653-3a86c4ee9732?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Nairobi, Kenya",
      grade: "Year 10 (IGCSE)",
      size: "large"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kampala, Uganda",
      grade: "Year 8",
      size: "small"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Dar es Salaam, Tanzania",
      grade: "Year 5",
      size: "small"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      location: "Kigali, Rwanda",
      grade: "A-Levels",
      size: "wide"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Learning Knows No Boundaries</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join a vibrant community of scholars from across East Africa and beyond. Experience world-class education while studying from the comfort and safety of your own home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Large Item */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl border border-slate-700">
            <img 
              src={students[0].image} 
              alt="Student studying in Kenya" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 text-brainy-red text-sm font-semibold mb-1">
                <MapPin size={14} /> {students[0].location}
              </div>
              <div className="font-bold text-xl">{students[0].grade}</div>
            </div>
          </div>

          {/* Top Right Item */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl border border-slate-700">
             <img 
              src={students[1].image} 
              alt="Student studying in Uganda" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1 text-brainy-gold text-xs font-semibold mb-0.5">
                <MapPin size={12} /> {students[1].location}
              </div>
            </div>
          </div>

          {/* Middle Right Item */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-2xl border border-slate-700">
             <img 
              src={students[2].image} 
              alt="Student studying in Tanzania" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1 text-brainy-gold text-xs font-semibold mb-0.5">
                <MapPin size={12} /> {students[2].location}
              </div>
            </div>
          </div>

          {/* Bottom Wide Item */}
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-2xl border border-slate-700">
             <img 
              src={students[3].image} 
              alt="Student studying in Rwanda" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 text-brainy-red text-sm font-semibold mb-1">
                <MapPin size={14} /> {students[3].location}
              </div>
              <div className="font-bold text-lg">{students[3].grade}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCommunity;
