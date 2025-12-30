
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, Target } from 'lucide-react';

const data = [
  { year: '2020', Primary: 80, Secondary: 60, IGCSE: 40, ALevels: 20 },
  { year: '2021', Primary: 140, Secondary: 95, IGCSE: 75, ALevels: 35 },
  { year: '2022', Primary: 210, Secondary: 150, IGCSE: 120, ALevels: 65 },
  { year: '2023', Primary: 290, Secondary: 220, IGCSE: 180, ALevels: 105 },
  { year: '2024', Primary: 380, Secondary: 310, IGCSE: 260, ALevels: 160 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl">
        <p className="text-white font-bold mb-2 border-b border-slate-700 pb-1">Year {label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <span className="text-xs font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="text-xs font-bold text-white">
                {entry.value} Students
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between gap-8">
            <span className="text-xs font-bold text-slate-400">Total:</span>
            <span className="text-xs font-black text-brainy-gold">
              {payload.reduce((acc: number, curr: any) => acc + curr.value, 0)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const EnrollmentTrends: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brainy-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-center mb-16">
          <div className="lg:col-span-1">
            <h2 className="text-brainy-red font-semibold tracking-wide uppercase text-sm mb-3">
              Growth & Trust
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Growing <span className="text-brainy-gold">Global</span> Community
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Since 2020, Brainybay has experienced unprecedented growth. Our commitment to the Cambridge standard and innovative online delivery has made us the choice for hundreds of families worldwide.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brainy-red/10 rounded-lg flex items-center justify-center border border-brainy-red/20">
                  <TrendingUp className="text-brainy-red" />
                </div>
                <div>
                  <div className="text-white font-bold">4.5x Growth</div>
                  <div className="text-xs text-slate-500">Student body expansion since launch</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brainy-blue/10 rounded-lg flex items-center justify-center border border-brainy-blue/20">
                  <Users className="text-brainy-blue" />
                </div>
                <div>
                  <div className="text-white font-bold">950+ Active Scholars</div>
                  <div className="text-xs text-slate-500">Currently enrolled across all key stages</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brainy-gold/10 rounded-lg flex items-center justify-center border border-brainy-gold/20">
                  <Target className="text-brainy-gold" />
                </div>
                <div>
                  <div className="text-white font-bold">100% Digital Native</div>
                  <div className="text-xs text-slate-500">Optimized for online-first pedagogy</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 p-6 md:p-10 rounded-3xl border border-slate-700 backdrop-blur-sm h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#800000" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#800000" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorIGCSE" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorALevels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8' }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '20px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="Primary" 
                  stackId="1"
                  stroke="#1e3a8a" 
                  fillOpacity={1} 
                  fill="url(#colorPrimary)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="Secondary" 
                  stackId="1"
                  stroke="#800000" 
                  fillOpacity={1} 
                  fill="url(#colorSecondary)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="IGCSE" 
                  stackId="1"
                  stroke="#fbbf24" 
                  fillOpacity={1} 
                  fill="url(#colorIGCSE)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="ALevels" 
                  stackId="1"
                  stroke="#94a3b8" 
                  fillOpacity={1} 
                  fill="url(#colorALevels)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentTrends;
