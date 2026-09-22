import React from 'react';

/**
 * StatusIndicator component for UPI Sentinel.
 * Represents product operating status with an intentional, restrained indicator dot
 * and technical monospace tag, avoiding generic dashboard metric widgets.
 */
export function StatusIndicator({
  status = 'ready',
  label,
  pulse = true,
  size = 'md',
  className = '',
}) {
  const statusConfig = {
    ready: {
      color: 'bg-amber-500',
      ring: 'bg-amber-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/25',
      bg: 'bg-amber-500/10',
      defaultLabel: 'STANDBY / READY',
    },
    active: {
      color: 'bg-emerald-500',
      ring: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/25',
      bg: 'bg-emerald-500/10',
      defaultLabel: 'PROTECTION ACTIVE',
    },
    safe: {
      color: 'bg-emerald-400',
      ring: 'bg-emerald-400/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/25',
      bg: 'bg-emerald-500/10',
      defaultLabel: 'VERIFIED MATCH',
    },
    warning: {
      color: 'bg-red-500',
      ring: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/25',
      bg: 'bg-red-500/10',
      defaultLabel: 'MISMATCH FLAGGED',
    },
    verifying: {
      color: 'bg-amber-400',
      ring: 'bg-amber-400/30',
      text: 'text-amber-300',
      border: 'border-amber-400/30',
      bg: 'bg-amber-400/10',
      defaultLabel: 'INSPECTING',
    },
  };

  const current = statusConfig[status] || statusConfig.ready;
  const displayLabel = label || current.defaultLabel;

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[9px] gap-1.5',
    md: 'px-2.5 py-1 text-[10px] gap-2',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border ${current.border} ${current.bg} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.color} opacity-60`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${current.color}`}
        />
      </span>
      <span
        className={`font-mono uppercase font-medium tracking-wider ${current.text}`}
      >
        {displayLabel}
      </span>
    </div>
  );
}

export default StatusIndicator;
