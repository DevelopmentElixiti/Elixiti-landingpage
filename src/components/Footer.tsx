import React from 'react';
import { useStore } from '@nanostores/react';
import { languageStore, translations } from '../store/languageStore';

const Footer = () => {
  const lang = useStore(languageStore);
  const t = translations[lang];

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center py-6 px-10 border-t border-white/5 bg-black/20 mt-auto">
      <div className="text-xs text-[#64748b] mb-4 md:mb-0">
        {t.footer}
      </div>
      <div className="text-sm text-[#94a3b8] font-medium">
        {t.contact} <a href="mailto:ales.turk@elixiti.com" className="text-[#38bdf8] no-underline transition-colors hover:text-[#38bdf8]/80 font-semibold">ales.turk@elixiti.com</a>
      </div>
    </footer>
  );
};

export default Footer;
