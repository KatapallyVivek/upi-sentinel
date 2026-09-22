import React from 'react';

/**
 * Reusable IconButton component for UPI Sentinel.
 * Provides accessible tap target (>=44px), clean hover and focus states.
 */
export function IconButton({
  icon: Icon,
  label,
  variant = 'secondary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center transition-all duration-150 rounded-xl select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 active:scale-[0.96] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles = {
    primary:
      'bg-amber-500 hover:bg-amber-400 text-[#0B0D10] font-semibold active:bg-amber-600',
    secondary:
      'bg-[#181C24] hover:bg-[#202632] text-[#94A3B8] hover:text-[#F3F4F6] border border-white/[0.08]',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-[#94A3B8] hover:text-[#F3F4F6]',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-[#F3F4F6] border border-white/[0.12]',
  };

  const sizeStyles = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-11 h-11 p-2.5',
    lg: 'w-12 h-12 p-3',
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.secondary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />}
    </button>
  );
}

export default IconButton;
