import React from 'react';
import Container from './Container';
import BottomNavigation from './BottomNavigation';

/**
 * AppShell component.
 * Provides the mobile shell layout, bounding container,
 * smooth scrolling viewport, and fixed bottom navigation.
 */
export function AppShell({ children, showBottomNav = true }) {
  return (
    <Container>

      <div className="w-full bg-[#0B0D10] text-[#64748B] text-[10px] font-mono px-4 pt-2 pb-1 flex items-center justify-between border-b border-white/[0.04]">
        <span className="flex items-center gap-1.5 text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SENTINEL OS SHIELD
        </span>
        <span className="text-[10px] text-[#64748B]">SECURE PROTOCOL</span>
      </div>


      <main className="flex-1 flex flex-col w-full overflow-y-auto overflow-x-hidden">
        {children}
      </main>


      {showBottomNav && <BottomNavigation />}
    </Container>
  );
}

export default AppShell;
