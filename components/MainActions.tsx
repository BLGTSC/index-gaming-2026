import React from 'react';
import { Users, Server, Terminal, ExternalLink, ChevronRight } from 'lucide-react';
import { LINKS } from '../constants';

const CyberCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href: string;
  idx: string;
}> = ({ title, subtitle, icon, href, idx }) => (
  <a 
    href={href}
    className="group relative flex-1 min-w-[300px] h-72 bg-brand-secondary/20 backdrop-blur-sm border-l border-brand-accent/20 hover:border-brand-accent transition-all duration-300 clip-corner overflow-hidden"
    target="_blank"
    rel="noreferrer"
  >
    {/* Animated Scanner Bar */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-accent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_linear_infinite]" />
    
    {/* Decorative Background Elements */}
    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
       <span className="font-mono text-6xl font-bold text-white">{idx}</span>
    </div>

    {/* Content Container */}
    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="p-3 bg-brand-dark border border-brand-accent/30 text-brand-accent clip-corner group-hover:bg-brand-accent group-hover:text-black transition-colors duration-300">
          {icon}
        </div>
        <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-brand-accent transition-colors" />
      </div>

      {/* Text Info */}
      <div className="space-y-2">
        <h3 className="font-display text-3xl font-bold text-white tracking-wide group-hover:text-brand-accent transition-colors">
          {title}
        </h3>
        <div className="h-[1px] w-12 bg-gray-600 group-hover:w-full group-hover:bg-brand-accent transition-all duration-500" />
        <p className="font-mono text-xs text-gray-400 group-hover:text-gray-200 uppercase tracking-wider">
          {subtitle}
        </p>
      </div>

      {/* Hover Call to Action */}
      <div className="flex items-center gap-2 text-sm font-bold text-brand-accent opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
         <span>INITIATE</span>
         <ChevronRight size={16} />
      </div>
    </div>
    
    {/* Hover Glow */}
    <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </a>
);

const MainActions: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 -mt-10 relative z-30">
      <div className="flex flex-col lg:flex-row gap-8">
        <CyberCard 
          title="FORUM" 
          subtitle="Community Hub // Clan Ops"
          href={LINKS.FORUM}
          icon={<Users className="w-6 h-6" />}
          idx="01"
        />
        
        <CyberCard 
          title="SERVERS" 
          subtitle="Live Uplink // Top Ranking"
          href={LINKS.SERVERS}
          icon={<Server className="w-6 h-6" />}
          idx="02"
        />

        <CyberCard 
          title="PANEL" 
          subtitle="Admin Console // Control"
          href={LINKS.PANEL}
          icon={<Terminal className="w-6 h-6" />}
          idx="03"
        />
      </div>
    </div>
  );
};

export default MainActions;