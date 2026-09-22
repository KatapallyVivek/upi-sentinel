import React, { useEffect } from 'react';
import { X, ShieldCheck, SearchCheck, AlertTriangle } from 'lucide-react';
import Button from './Button';

/**
 * HowItWorksModal component.
 * Clear, technical, product-focused bottom sheet / modal explaining
 * how Sentinel functions as a pre-authorization safety checkpoint.
 */
export function HowItWorksModal({ isOpen, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Context & Intent',
      desc: 'Declare the real-world purpose of your payment — like paying a utility bill, buying from a merchant, or reimbursing a contact.',
      icon: SearchCheck,
      tag: 'Step 1',
    },
    {
      num: '02',
      title: 'Structural Cross-Reference',
      desc: 'Sentinel cross-examines the destination VPA handle, bank routing code, and Merchant Category Code (MCC) against verified merchant directories.',
      icon: AlertTriangle,
      tag: 'Step 2',
    },
    {
      num: '03',
      title: 'Pre-PIN Safety Decision',
      desc: 'Receive an instant green (matched) or amber/red (intent mismatch) verdict before you ever enter your UPI PIN.',
      icon: ShieldCheck,
      tag: 'Step 3',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-it-works-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-[2px] transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#12151B] border-t sm:border border-white/[0.12] rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 space-y-5 animate-sentinel-in max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto sm:hidden -mt-2 mb-3" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] text-amber-500 uppercase tracking-widest font-semibold">
              Operating Protocol
            </span>
            <h2 id="how-it-works-title" className="text-lg font-bold text-[#F3F4F6]">
              How Sentinel Works
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg bg-[#181C24] hover:bg-[#222834] text-[#94A3B8] hover:text-[#F3F4F6] border border-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Traditional UPI apps blindly route funds wherever a QR code or VPA points. Sentinel sits as an independent safety checkpoint before PIN authorization to ensure your money goes where you intended.
        </p>


        <div className="space-y-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-3.5 rounded-xl bg-[#181C24] border border-white/[0.06] flex items-start gap-3.5"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-500">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[#F3F4F6]">
                      {step.title}
                    </h4>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-[#94A3B8]">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>


        <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06] text-[11px] text-[#94A3B8] flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Zero-Knowledge Safety:</strong> Sentinel never requests your UPI PIN, bank credentials, or account balances.
          </span>
        </div>

        <Button variant="primary" size="md" className="w-full" onClick={onClose}>
          Understood
        </Button>
      </div>
    </div>
  );
}

export default HowItWorksModal;
