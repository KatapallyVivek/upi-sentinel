import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  AlertOctagon,
  Lock,
  ScanEye,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusIndicator from '../components/ui/StatusIndicator';
import Section from '../components/ui/Section';
import HowItWorksModal from '../components/ui/HowItWorksModal';

export function Home() {
  const navigate = useNavigate();
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <ScreenTransition>
      <PageHeader
        title="UPI Sentinel"
        subtitle="Your payment safety checkpoint."
      />

      <div className="flex-1 px-4 py-5 space-y-6 pb-12">
        {/* ==================================================
            SECURITY STATUS (Product status indicator)
            ================================================== */}
        <section aria-label="Security Status">
          <Card
            variant="default"
            padding="md"
            className="border-white/[0.09] bg-gradient-to-b from-[#141822] to-[#10131A]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/25 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-semibold text-[#F3F4F6] tracking-tight">
                      Sentinel Protection
                    </h2>
                    <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[12px] text-[#94A3B8] font-normal mt-0.5">
                    Ready to verify your next payment
                  </p>
                </div>
              </div>

              <StatusIndicator status="ready" label="ARMED" pulse={true} />
            </div>

            {/* Technical Operating Guardrails */}
            <div className="mt-3 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-[11px] text-[#94A3B8]">
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <Lock className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                <span>Zero Bank Logins</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <ScanEye className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                <span>Pre-PIN Checkpoint</span>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            MAIN HERO SECTION
            ================================================== */}
        <section aria-label="Hero" className="space-y-4 pt-1">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Pre-Authorization Safety Layer
            </div>

            <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#F3F4F6] leading-[1.25]">
              Before you pay,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F4F6] via-[#E2E8F0] to-[#94A3B8]">
                know what you're paying for.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Sentinel checks whether a payment matches the context and intent behind it before you authorize the transaction.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-1">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/check-payment')}
              className="w-full text-sm font-semibold tracking-tight shadow-lg shadow-amber-950/25"
            >
              Check a Payment
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={HelpCircle}
              iconPosition="left"
              onClick={() => setIsHowItWorksOpen(true)}
              className="w-full text-xs font-medium text-[#94A3B8] hover:text-[#F3F4F6]"
            >
              How Sentinel Works
            </Button>
          </div>
        </section>

        {/* ==================================================
            SAFETY CHECKPOINT SHOWCASE (Live Inspection Sample)
            Illustrates the core problem: Intent Mismatch
            ================================================== */}
        <Section
          eyebrow="Live Inspection Anatomy"
          title="What Sentinel Catches"
          subtitle="Real-time discrepancy detection before money leaves your account"
        >
          <Card
            variant="warning"
            padding="md"
            className="space-y-3 bg-[#130E10] border-red-500/30"
          >
            <div className="flex items-start justify-between gap-2 border-b border-white/[0.06] pb-2.5">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-xs font-semibold text-red-300">
                  Intent Mismatch Intercepted
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                ALERT
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05] space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#64748B] block">
                  User Stated Intent
                </span>
                <p className="font-medium text-[#F3F4F6] text-xs">
                  Electricity Bill Payment (BESCOM) • ₹1,450.00
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 space-y-1">
                <span className="text-[10px] uppercase font-mono text-red-400/90 block">
                  Actual Destination VPA
                </span>
                <div className="flex items-center justify-between gap-1 font-mono text-[11px] text-red-200">
                  <span className="truncate">bescom.desk92@ybl</span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-red-500/20 text-red-300 rounded shrink-0">
                    Individual Account
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-red-300/90 bg-red-950/30 p-2.5 rounded-lg border border-red-500/20 flex items-start gap-2 leading-relaxed">
              <span className="font-bold text-red-400 shrink-0">Verdict:</span>
              <span>
                Personal savings account masquerading as utility desk. <strong>Do not enter UPI PIN.</strong>
              </span>
            </div>
          </Card>
        </Section>

        {/* ==================================================
            CORE SENTINEL ARCHITECTURE PRINCIPLES
            ================================================== */}
        <Section
          eyebrow="Security Architecture"
          title="Privacy-First Safety Layer"
          subtitle="Engineered as a non-custodial pre-authorization safety checkpoint"
        >
          <div className="space-y-2.5">
            <Card variant="default" padding="sm" className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ScanEye className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#F3F4F6]">
                    Context & Intent Verification
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    Evaluates the claimed purpose against recipient VPA entity type, MCC classification, and historical patterns.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default" padding="sm" className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#F3F4F6]">
                    Zero Bank Credentials Required
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    Operates without your UPI PIN, banking credentials, or bank balance access. Never touches the monetary rail directly.
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="default" padding="sm" className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#F3F4F6]">
                    Pre-Authorization Intercept
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                    Provides an immediate stop/go recommendation before you commit your biometric or 6-digit PIN in payment apps.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Quick Route Shortcuts to upcoming checkpoints */}
        <section aria-label="Direct Verification Tools" className="pt-1">
          <Card
            variant="interactive"
            padding="md"
            onClick={() => navigate('/verify-proof')}
            className="flex items-center justify-between gap-3 border-white/[0.08]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 text-[#94A3B8]">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-[#F3F4F6] truncate">
                  Screenshot Proof Verification
                </h4>
                <p className="text-[11px] text-[#94A3B8] truncate">
                  Incoming payment receipt authenticity check
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#64748B] shrink-0" />
          </Card>
        </section>
      </div>

      {/* "How Sentinel Works" Explainer Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </ScreenTransition>
  );
}

export default Home;
