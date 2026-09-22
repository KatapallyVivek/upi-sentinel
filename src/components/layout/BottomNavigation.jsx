import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, ScanLine, FileCheck2, Cpu } from 'lucide-react';

/**
 * BottomNavigation component.
 * Grounded mobile navigation bar with restrained styling,
 * clear visual indicators for active states, and comfortable tap targets.
 */
export function BottomNavigation() {
  const navItems = [
    {
      to: '/',
      label: 'Checkpoint',
      icon: Shield,
      end: true,
    },
    {
      to: '/check-payment',
      label: 'Check Intent',
      icon: ScanLine,
    },
    {
      to: '/analysis',
      label: 'Analysis',
      icon: Cpu,
    },
    {
      to: '/verify-proof',
      label: 'Verify Proof',
      icon: FileCheck2,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="sticky bottom-0 z-40 w-full bg-[#0E1117]/95 backdrop-blur-md border-t border-white/[0.08] px-2 py-1.5"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 select-none cursor-pointer ${
                  isActive
                    ? 'text-amber-400 font-medium'
                    : 'text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-white/[0.02]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon
                      className={`w-4 h-4 transition-transform duration-150 ${
                        isActive ? 'scale-110 text-amber-500 stroke-[2.2]' : 'stroke-[1.8]'
                      }`}
                      aria-hidden="true"
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] mt-1 tracking-tight truncate ${
                      isActive ? 'text-amber-400 font-semibold' : 'text-[#64748B]'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;
