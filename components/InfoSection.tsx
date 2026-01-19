import React from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';

const InfoSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Low Latency",
      desc: "Servere optimizate pentru ping minim și performanță maximă. Fără lag."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
      title: "Anti-Cheat",
      desc: "Sisteme avansate de protecție pentru a asigura un mediu de joc corect."
    },
    {
      icon: <Target className="w-8 h-8 text-red-400" />,
      title: "Competitiv",
      desc: "Turnee lunare, sistem de rankuri și o comunitate de jucători skilled."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">
          DE CE SĂ ALEGI <span className="text-brand-accent">CSX16</span>?
        </h2>
        <div className="w-24 h-1 bg-brand-accent mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-brand-card p-8 rounded border border-white/5 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-2 group">
            <div className="mb-6 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-brand-accent/10 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold font-display text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;