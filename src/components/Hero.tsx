import React from 'react';
import { useStore } from '@nanostores/react';
import { languageStore, translations } from '../store/languageStore';

const Hero = () => {
  const lang = useStore(languageStore);
  const t = translations[lang];

  return (
    <section className="pt-20 pb-10 px-10 text-center max-w-[900px] mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#38bdf8] blur-[200px] opacity-15 z-0 pointer-events-none"></div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.15] mb-6 text-white tracking-tight">
          {t.heroTitle1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#818cf8]">
            {t.heroTitle2}
          </span>
        </h1>
        <p className="text-xl text-[#94a3b8] leading-relaxed mx-auto font-normal max-w-[700px]">
          {t.heroSubtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;
