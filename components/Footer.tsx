import React from 'react';
import { SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark/90 border-t border-brand-accent/10 py-6 mt-10 relative overflow-hidden backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
        <p className="text-gray-600 text-xs font-mono tracking-widest uppercase">
          {SITE_CONFIG.footerText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;