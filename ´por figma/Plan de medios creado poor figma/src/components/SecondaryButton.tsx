import { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showIcon?: boolean;
}

export function SecondaryButton({ 
  children, 
  showIcon = true, 
  className = "", 
  ...props 
}: SecondaryButtonProps) {
  return (
    <button
      className={`
        relative
        px-8 py-4 
        bg-white/5 backdrop-blur-sm
        border-2 border-white/20 
        text-white
        rounded-xl 
        transition-all duration-300
        hover:bg-white/10 hover:border-white/40
        hover:shadow-xl hover:shadow-white/10
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        inline-flex items-center justify-center gap-2
        group
        ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {showIcon && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
    </button>
  );
}