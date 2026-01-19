import React from 'react';
import { ExternalLink } from 'lucide-react';

// LISTA PARTENERI - ADAUGA AICI PARTENERII TAI
const PARTNERS_LIST = [
  { name: 'GAMETRACKER', url: 'https://www.gametracker.com/server_info/cs.csx16.ro:27015/' },
  { name: 'WARGODS', url: '#' },
  { name: 'TNI HOSTING', url: '#' },
  { name: 'CS16.RO', url: '#' },
];

const Partners: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 relative z-30">
      {/* Container Header */}
      <div className="flex items-center justify-center gap-2 mb-6 opacity-70">
        <div className="w-1 h-1 bg-brand-accent"></div>
        <h3 className="font-mono text-xs font-bold text-brand-accent tracking-[0.3em] uppercase">
          OFFICIAL PARTNERS
        </h3>
        <div className="w-1 h-1 bg-brand-accent"></div>
      </div>

      {/* Partners Container */}
      <div className="flex flex-wrap justify-center gap-4">
        {PARTNERS_LIST.map((partner, index) => (
          <a 
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 bg-black/40 border border-white/10 overflow-hidden transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent/5 clip-corner min-w-[140px] text-center"
          >
            {/* Hover Highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span className="font-display font-bold text-gray-400 group-hover:text-white tracking-wider transition-colors">
                {partner.name}
              </span>
              <ExternalLink className="w-3 h-3 text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-5px] group-hover:translate-x-0 duration-300" />
            </div>

            {/* Corner Accents */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        ))}
        
        {/* Placeholder Message if list is empty */}
        {PARTNERS_LIST.length === 0 && (
           <div className="text-xs font-mono text-gray-500 tracking-widest">[ NO DATA LINK ESTABLISHED ]</div>
        )}
      </div>
    </div>
  );
};

export default Partners;