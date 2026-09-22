import React from 'react';

/**
 * ScreenTransition component.
 * Provides a restrained, intentional entrance animation (6px vertical fade-in, 220ms)
 * to avoid abrupt route switches without distracting heavy motion.
 */
export function ScreenTransition({ children, className = '' }) {
  return (
    <div className={`animate-sentinel-in w-full flex-1 flex flex-col ${className}`}>
      {children}
    </div>
  );
}

export default ScreenTransition;
