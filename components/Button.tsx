import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  href?: string;
  fullWidth?: boolean;
  icon?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  fullWidth = false, 
  icon = false,
  className = '',
  children, 
  ...props 
}) => {
  // Base styles: Angled corners via clip-path, mono font, bold
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 font-display font-bold uppercase tracking-widest transition-all duration-200 transform hover:-translate-y-1 active:scale-95 focus:outline-none clip-corner overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-accent text-black hover:bg-white",
    secondary: "bg-brand-secondary text-brand-accent border border-brand-accent/30 hover:border-brand-accent hover:bg-brand-accent/10",
    outline: "border border-white/20 text-white hover:border-white hover:bg-white/5",
    ghost: "bg-transparent text-gray-400 hover:text-brand-accent"
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  const InnerContent = () => (
    <>
      <span className="relative z-10 flex items-center">
        {children}
        {icon && <ExternalLink className="ml-2 w-4 h-4" />}
      </span>
      {/* Tech decoration lines */}
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-current opacity-50" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></span>
      {/* Glitch hover background */}
      {variant === 'primary' && <span className="absolute inset-0 bg-white translate-x-[-100%] skew-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0 opacity-20"></span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        <InnerContent />
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <InnerContent />
    </button>
  );
};

export default Button;