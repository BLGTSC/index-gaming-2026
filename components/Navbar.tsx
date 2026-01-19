import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Activity } from 'lucide-react';
import { LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-md border-brand-accent/30 py-3' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Tech Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Shield className="text-white w-10 h-10 relative z-10" />
            <div className="absolute inset-0 bg-brand-accent blur-md opacity-20 group-hover:opacity-60 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-bold text-white tracking-widest leading-none group-hover:text-brand-accent transition-colors">
              CSX16
            </span>
            <span className="text-[10px] font-mono text-brand-accent tracking-[0.4em] opacity-70">
              NETWORK
            </span>
          </div>
        </div>

        {/* Desktop Links - HUD Style */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { name: 'FORUM', link: LINKS.FORUM },
            { name: 'SERVERS', link: LINKS.SERVERS },
            { name: 'PANEL', link: LINKS.PANEL }
          ].map((item) => (
            <a 
              key={item.name}
              href={item.link} 
              className="relative px-6 py-2 text-sm font-mono font-bold text-gray-400 hover:text-white transition-colors group overflow-hidden"
            >
              <span className="relative z-10">{item.name}</span>
              {/* Top border animation */}
              <span className="absolute top-0 left-0 w-full h-[1px] bg-brand-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              {/* Bottom border animation */}
              <span className="absolute bottom-0 right-0 w-full h-[1px] bg-brand-accent transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              {/* Background flash */}
              <span className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
          ))}
          
          <div className="h-6 w-[1px] bg-white/20 mx-4"></div>

          <a href={LINKS.FORUM} className="flex items-center gap-2 px-5 py-2 bg-brand-accent/10 border border-brand-accent/50 text-brand-accent text-xs font-bold font-mono uppercase hover:bg-brand-accent hover:text-black transition-all clip-corner">
            <Activity size={14} />
            Login
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-accent p-2 border border-brand-accent/30 bg-brand-accent/5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-brand-dark border-b border-brand-accent/30 p-4 flex flex-col gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
           {[
             { name: 'FORUM', link: LINKS.FORUM },
             { name: 'SERVERS', link: LINKS.SERVERS },
             { name: 'PANEL', link: LINKS.PANEL }
           ].map((item) => (
             <a 
               key={item.name}
               href={item.link} 
               className="block py-3 px-4 bg-white/5 text-gray-200 font-display tracking-widest border-l-2 border-transparent hover:border-brand-accent hover:bg-white/10 hover:pl-6 transition-all"
             >
               {item.name}
             </a>
           ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;