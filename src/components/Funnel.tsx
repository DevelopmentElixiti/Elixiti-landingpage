import React from 'react';
import { useStore } from '@nanostores/react';
import { languageStore, translations } from '../store/languageStore';

const Funnel = () => {
  const lang = useStore(languageStore);
  const t = translations[lang];

  // Helper component to render icons with consistent styling
  const Icon = ({ path, x, y, size = 40, color = "white" }: { path: string, x: number, y: number, size?: number, color?: string }) => (
    <g transform={`translate(${x - size / 2}, ${y - size / 2})`}>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`scale(${size / 24})`}
      />
    </g>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 px-6 md:px-15 pb-24 items-center relative z-10 max-w-[1300px] mx-auto">
      <div className="flex flex-col gap-6">
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-10 md:p-12 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {t.featureTitle}
          </h2>
          
          <p className="text-lg text-[#e2e8f0] leading-relaxed mb-8">
            {t.featureDesc1}
          </p>
          
          <p className="text-base md:text-lg text-[#cbd5e1] leading-loose mb-10 opacity-90">
            {t.featureDesc2}
          </p>
          
          <div className="bg-[#38bdf8]/5 border-l-4 border-[#38bdf8] p-6 rounded-r-2xl">
            <p className="text-base md:text-lg text-[#f8fafc] leading-relaxed m-0 italic font-light opacity-90">
              {t.validation}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        {/* Transparent container matching the left card style */}
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] w-full max-w-[550px] backdrop-blur-md">
          <svg viewBox="0 0 800 1000" className="w-full h-auto block rounded-lg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#65a30d" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            
            {/* 1. PROBLEM */}
            <path d="M 40 80 L 760 80 L 700 280 L 100 280 Z" fill="url(#grad1)" />
            <text x="400" y="120" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">{t.f1}</text>
            
            <Icon x={200} y={190} size={45} path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />
            <text x="200" y="240" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">{t.f1a}</text>
            <text x="200" y="260" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">{t.f1b}</text>
            
            <Icon x={400} y={190} size={45} path="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18" />
            <text x="400" y="240" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">{t.f1c}</text>
            <text x="400" y="260" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">{t.f1d}</text>
            
            <Icon x={600} y={190} size={45} path="M12 3v18M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18" />
            <text x="600" y="240" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">{t.f1e}</text>
            <text x="600" y="260" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="middle">{t.f1f}</text>
            
            {/* 2. SOLUTION */}
            <path d="M 105 290 L 695 290 L 620 490 L 180 490 Z" fill="url(#grad2)" />
            <text x="400" y="330" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">{t.f2}</text>
            
            <Icon x={400} y={420} size={80} path="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04 M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
            
            <Icon x={485} y={410} size={35} path="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35" />
            <text x={510} y={405} fontFamily="sans-serif" fontSize="17" fontWeight="bold" fill="white" textAnchor="start">{t.f2a}</text>
            <text x={510} y={425} fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="white" textAnchor="start">(AI/ML)</text>
            
            {/* 3. HUMAN DECISION */}
            <path d="M 185 500 L 615 500 L 540 700 L 260 700 Z" fill="url(#grad3)" />
            <text x="400" y="550" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">{t.f3}</text>
            <text x="400" y="580" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">{t.f3a}</text>
            
            <Icon x={400} y={640} size={60} path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            <circle cx="435" cy="630" r="14" fill="#fff" />
            <path d="M427 630 l5 5 l10 -10" fill="none" stroke="#84cc16" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* 4. AGENTIC EXECUTION */}
            <path d="M 265 710 L 535 710 L 480 860 L 320 860 Z" fill="url(#grad4)" />
            <text x="400" y="750" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">{t.f4}</text>
            <text x="400" y="780" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">{t.f4a}</text>
            
            <Icon x={400} y={825} size={50} path="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            <text x="400" y="820" fontFamily="sans-serif" fontSize="18" fontWeight="bold" fill="#ea580c" textAnchor="middle">A</text>
            
            {/* Connecting lines - Using lighter white */}
            <line x1="400" y1="860" x2="400" y2="890" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="150" y1="890" x2="650" y2="890" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="150" y1="890" x2="150" y2="910" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="400" y1="890" x2="400" y2="910" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <line x1="650" y1="890" x2="650" y2="910" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            
            {/* Results Icons - Using blueish white */}
            <Icon x={150} y={940} size={45} path="M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6" color="#94a3b8" />
            <text x="150" y="975" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#94a3b8" textAnchor="middle">{t.res1a}</text>
            <text x="150" y="992" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#94a3b8" textAnchor="middle">{t.res1b}</text>
            
            <Icon x={400} y={940} size={45} path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" color="#94a3b8" />
            <text x="400" y="975" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#94a3b8" textAnchor="middle">{t.res2a}</text>
            <text x="400" y="992" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#94a3b8" textAnchor="middle">{t.res2b}</text>
            
            <Icon x={650} y={940} size={45} path="M12 8v4l3 3 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" color="#94a3b8" />
            <text x="650" y="975" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#94a3b8" textAnchor="middle">{t.res3a}</text>
            <text x="650" y="992" fontFamily="sans-serif" fontSize="15" fontWeight="bold" fill="#94a3b8" textAnchor="middle">{t.res3b}</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Funnel;
