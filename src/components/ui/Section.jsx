import React from 'react';

/**
 * Semantic Section component for structured mobile-first layout.
 * Ensures disciplined vertical rhythm, typography hierarchy, and spacing.
 */
export function Section({
  children,
  eyebrow,
  title,
  subtitle,
  action,
  className = '',
  headerClassName = '',
  as: Component = 'section',
  ...props
}) {
  const hasHeader = eyebrow || title || subtitle || action;

  return (
    <Component className={`w-full ${className}`} {...props}>
      {hasHeader && (
        <div className={`mb-3.5 flex items-start justify-between gap-3 ${headerClassName}`}>
          <div className="space-y-0.5">
            {eyebrow && (
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-500 font-medium">
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="text-base font-semibold text-[#F3F4F6] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 pt-0.5">{action}</div>}
        </div>
      )}
      {children}
    </Component>
  );
}

export default Section;
