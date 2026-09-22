import React from 'react';

/**
 * Reusable Button component for UPI Sentinel.
 * Follows restrained dark fintech visual design:
 * High contrast, tactile touch response, accessible focus rings.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles = {
    primary:
      'bg-amber-500 hover:bg-amber-400 text-[#0B0D10] font-semibold shadow-sm shadow-amber-950/20 active:bg-amber-600',
    secondary:
      'bg-[#181C24] hover:bg-[#202632] text-[#F3F4F6] border border-white/[0.08] hover:border-white/[0.16]',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-[#F3F4F6] border border-white/[0.14] hover:border-white/[0.24]',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-[#94A3B8] hover:text-[#F3F4F6]',
    danger:
      'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-2 min-h-[36px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-5 py-3.5 min-h-[50px] gap-2.5 w-full',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
          )}
        </>
      )}
    </button>
  );
}

export default Button;
