import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, className = "", ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`
        relative
        px-8 py-4 
        bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800
        text-white 
        rounded-xl
        overflow-hidden
        transition-all duration-300
        hover:shadow-2xl hover:shadow-teal-500/30
        hover:scale-[1.02]
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}