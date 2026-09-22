import React from 'react';

/**
 * Reusable Card component for UPI Sentinel.
 * Employs subtle dark surface levels and fine 1px borders for depth,
 * strictly avoiding excessive glowing effects or generic AI glassmorphism.
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-2xl transition-all duration-150 relative overflow-hidden';

  const variantStyles = {
    default: 'bg-[#12151B] border border-white/[0.08]',
    elevated: 'bg-[#181C24] border border-white/[0.10] shadow-md shadow-black/40',
    interactive:
      'bg-[#12151B] border border-white/[0.08] hover:border-white/[0.16] hover:bg-[#151A22] cursor-pointer active:scale-[0.99]',
    highlight:
      'bg-[#12151B] border border-amber-500/30 shadow-sm shadow-amber-950/10',
    warning:
      'bg-[#171214] border border-red-500/30 shadow-sm shadow-red-950/10',
    safe:
      'bg-[#0F1714] border border-emerald-500/30 shadow-sm shadow-emerald-950/10',
    subtle: 'bg-[#0E1015] border border-white/[0.05]',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
    xl: 'p-6',
  };

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${paddingStyles[padding] || paddingStyles.md} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
