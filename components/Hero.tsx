import React from 'react';
import { SITE_CONFIG, LINKS } from '../constants';
import Button from './Button';
import Partners from './Partners';
import { Wifi } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20">
      {/* Dynamic Cyber Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-20 perspective-1000 transform rotate-x-60 z-10" />
      <div className="absolute inset-0 bg-vignette z-10" />
      
      {/* IMAGE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2665&auto=format&fit=crop"
          alt="Gaming Background"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/80"></div>
      </div>

      {/* Decorative HUD Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 hidden md:block">
         <div className="absolute top-32 left-10 w-[2px] h-32 bg-gradient-to-b from-transparent via-brand-accent to-transparent opacity-50"></div>
         <div className="absolute bottom-32 right-10 w-[2px] h-32 bg-gradient-to-b from-transparent via-brand-danger to-transparent opacity-50"></div>
         <div className="absolute top-32 right-10 flex flex-col gap-2 items-end opacity-50 font-mono text-xs text-brand-accent">
            <span>SYS.VER.4.0.2</span>
            <span>SECURE.CONN</span>
            <Wifi className="w-4 h-4 animate-pulse" />
         </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Main Title with Glitch */}
        <h1 className="relative text-5xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter leading-none uppercase">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] glitch-text" data-text={SITE_CONFIG.name}>
            {SITE_CONFIG.name}
          </span>
        </h1>
        
        {/* Action Buttons - Row of 4 */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full mb-12 flex-wrap">
          <Button href={LINKS.SERVERS} variant="primary" icon className="w-full md:w-auto min-w-[160px]">
            SERVERS
          </Button>
          <Button href={LINKS.FORUM} variant="secondary" className="w-full md:w-auto min-w-[160px]">
            FORUM
          </Button>
          <Button href={LINKS.PANEL} variant="secondary" className="w-full md:w-auto min-w-[160px]">
            PANEL
          </Button>
          <Button href={LINKS.DISCORD} variant="outline" className="w-full md:w-auto min-w-[160px] border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white">
            DISCORD
          </Button>
        </div>

        {/* Partners Section - Integrated directly below buttons */}
        <div className="w-full">
           <Partners />
        </div>

      </div>
    </div>
  );
};

export default Hero;