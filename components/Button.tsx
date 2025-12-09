import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brainy-red text-white hover:bg-red-950 hover:shadow-lg hover:shadow-red-900/20 border border-transparent",
    secondary: "bg-brainy-gold text-brainy-navy hover:bg-yellow-400 border border-transparent",
    outline: "bg-transparent border border-brainy-red text-brainy-red hover:bg-brainy-red/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;