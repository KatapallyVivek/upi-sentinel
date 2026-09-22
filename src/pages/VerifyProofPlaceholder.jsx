import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCheck2, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export function VerifyProofPlaceholder() {
  const navigate = useNavigate();

  return (
    <ScreenTransition>
      <PageHeader
        title="Verify Proof"
        subtitle="Receipt authenticity inspector"
        showBack={true}
        backTo="/"
      />

      <div className="flex-1 px-4 py-8 flex flex-col justify-between space-y-6">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Phase 5 Pipeline • Screenshot Verification
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#F3F4F6] tracking-tight">
              Payment Screenshot Verification
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              This module detects manipulated and fabricated "Payment Successful" screenshots commonly used to defraud merchants and peer sellers.
            </p>
          </div>

          <Card variant="default" padding="lg" className="space-y-4 border-white/[0.08]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <FileCheck2 className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-[#F3F4F6]">
                Upcoming Flow Architecture
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Phase 5 will implement image upload, OCR extraction of UTR/RRN reference codes, typography font tampering inspection, and layout anomaly detection.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-black/30 border border-white/[0.05] font-mono text-[11px] text-[#64748B] space-y-1">
              <div>// Planned Pipeline:</div>
              <div className="text-amber-400/80">→ Font & Layout Tampering Analyzer</div>
              <div className="text-amber-400/80">→ UTR Syntax & Timestamp Coherence</div>
            </div>
          </Card>
        </div>

        <div className="space-y-3 pt-6">
          <Button
            variant="secondary"
            size="md"
            icon={ArrowLeft}
            iconPosition="left"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Return to Checkpoint
          </Button>
        </div>
      </div>
    </ScreenTransition>
  );
}

export default VerifyProofPlaceholder;
