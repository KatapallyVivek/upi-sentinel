import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, ArrowLeft, CheckCircle2, ChevronLeft } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getPaymentContext } from '../data/paymentContext';

export function AnalysisPlaceholder() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve captured context from navigation state or storage
  const capturedContext =
    location.state?.paymentContext || getPaymentContext();

  return (
    <ScreenTransition>
      <PageHeader
        title="AI Analysis"
        subtitle="Context & intent cross-reference engine"
        showBack={true}
        backTo="/check-payment"
      />

      <div className="flex-1 px-4 py-6 flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          {/* Phase 3 Status Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Phase 3 Pipeline • AI Analysis Flow
          </div>

          {/* Captured Context Hand-off Confirmation (Phase 2 -> Phase 3 bridge) */}
          {capturedContext && (
            <Card
              variant="default"
              padding="sm"
              className="p-3.5 bg-[#141822] border-amber-500/25 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Context Ready for Analysis
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8]">
                  Phase 2 Hand-off
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.06]">
                <span className="font-medium text-[#F3F4F6]">
                  {capturedContext.purpose}
                </span>
                <span className="font-mono font-bold text-amber-400">
                  {capturedContext.expectedAmount}
                </span>
              </div>
              <div className="text-[11px] text-[#94A3B8] truncate">
                Expected: {capturedContext.expectedRecipient}
              </div>
            </Card>
          )}

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#F3F4F6] tracking-tight">
              Intent Analysis Engine
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              This module powers the real-time cross-referencing between user intent and destination account metadata.
            </p>
          </div>

          <Card variant="default" padding="lg" className="space-y-4 border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Cpu className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-[#F3F4F6]">
                Upcoming Flow Architecture
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Phase 3 will orchestrate the reasoning pipeline, analyzing entity mismatch, urgency coercion flags, and banking rail anomalies against the captured context.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/30 border border-white/[0.05] font-mono text-[11px] text-[#64748B] space-y-1">
              <div>// Pipeline Handlers:</div>
              <div className="text-amber-400/80">→ VPA Entity Resolution & MCC cross-check</div>
              <div className="text-amber-400/80">→ Deceptive Handle Pattern Heuristics</div>
            </div>
          </Card>
        </div>

        <div className="space-y-2 pt-4">
          <Button
            variant="secondary"
            size="md"
            icon={ChevronLeft}
            iconPosition="left"
            className="w-full"
            onClick={() => navigate('/check-payment')}
          >
            Back to Context Input
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            iconPosition="left"
            className="w-full text-xs text-[#64748B]"
            onClick={() => navigate('/')}
          >
            Return to Checkpoint Home
          </Button>
        </div>
      </div>
    </ScreenTransition>
  );
}

export default AnalysisPlaceholder;
