import React from 'react';

/**
 * Mobile-first Container.
 * Calibrated specifically for mobile viewports (~390px - 430px wide).
 * Centered gracefully on desktop with subtle boundary borders and backdrop.
 */
export function Container({ children, className = '' }) {
  return (
    <div className="min-h-screen w-full bg-[#07080A] text-[#F3F4F6] flex justify-center selection:bg-amber-500/20 selection:text-amber-200">
      <div
        className={`w-full max-w-[430px] min-h-screen bg-[#0B0D10] sm:border-x sm:border-white/[0.08] shadow-2xl flex flex-col relative ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
