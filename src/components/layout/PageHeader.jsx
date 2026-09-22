import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, ChevronLeft } from 'lucide-react';
import StatusIndicator from '../ui/StatusIndicator';

/**
 * PageHeader component.
 * Provides the top mobile app header. Adapts cleanly between the root Home screen
 * and sub-routes (with back button and phase tags).
 */
export function PageHeader({
  title,
  subtitle,
  showBack = false,
  backTo = '/',
  rightElement,
  className = '',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#0B0D10]/95 backdrop-blur-md border-b border-white/[0.08] px-4 py-3.5 flex items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(backTo)}
            aria-label="Go back"
            className="p-1.5 -ml-1.5 rounded-lg bg-[#141820] hover:bg-[#1E232E] text-[#94A3B8] hover:text-[#F3F4F6] border border-white/[0.08] transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {isHome && (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-amber-500" />
          </div>
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold tracking-tight text-[#F3F4F6] truncate">
              {title || (isHome ? 'UPI Sentinel' : 'Sentinel')}
            </h1>
            {isHome && (
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                v1.0
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#94A3B8] truncate leading-tight">
            {subtitle || (isHome ? 'Your payment safety checkpoint.' : 'Pre-authorization checkpoint')}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        {rightElement ? (
          rightElement
        ) : (
          <StatusIndicator status="ready" label="READY" />
        )}
      </div>
    </header>
  );
}

export default PageHeader;
