import React from 'react';
import { useStore } from '@nanostores/react';
import { languageStore, translations, type Language } from '../store/languageStore';

const Header = () => {
  const lang = useStore(languageStore);
  const t = translations[lang];

  return (
    <nav className="flex justify-between items-center py-5 px-10 border-b border-white/5 bg-[#0A192F]/90 sticky top-0 z-50 backdrop-blur-sm">
      <a href="/" className="text-2xl font-black text-white tracking-wider no-underline">
        ELIXITI<span className="text-[#38bdf8]">.</span>
      </a>
      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center gap-6">
          <a 
            href="/razpisiciscenje" 
            className="text-sm font-bold text-[#94a3b8] hover:text-[#38bdf8] transition-colors no-underline"
          >
            {t.tenders}
          </a>
        </div>
        <div className="flex gap-4 text-xs font-semibold">
          {(['SLO', 'ENG', 'GER'] as Language[]).map((l) => (
            <span
              key={l}
              onClick={() => languageStore.set(l)}
              className={`cursor-pointer transition-colors pb-1 ${
                lang === l ? 'text-[#38bdf8] border-b-2 border-[#38bdf8]' : 'text-[#64748b] hover:text-white'
              }`}
            >
              {l}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1.5 bg-[#10b981]/10 border border-[#10b981]/20 text-[#34d399] py-1.5 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <span className="inline-block w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_8px_#10b981]"></span>
            {t.beta}
          </div>
          <a 
            href="http://app.elixiti.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent border border-[#38bdf8] text-[#38bdf8] py-2 px-5 rounded-md font-bold text-xs cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:bg-[#38bdf8]/5 transition-colors no-underline inline-block"
          >
            {t.partnerLink}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
