import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquareText,
  FileText,
  CreditCard,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import {
  DEMO_SCENARIO,
  structurePaymentContext,
  savePaymentContext,
  getPaymentContext,
} from '../data/paymentContext';

export function CheckPayment() {
  const navigate = useNavigate();

  // Active context source tab
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'invoice' | 'details'

  // Input state with lazy initialization from previous context
  const [messageInput, setMessageInput] = useState(() => {
    const existing = getPaymentContext();
    return existing?.message || '';
  });
  const [capturedContext, setCapturedContext] = useState(() => {
    return getPaymentContext() || null;
  });

  // Update structured context whenever input changes
  const handleInputChange = (text) => {
    setMessageInput(text);
    if (text.trim().length > 0) {
      const sourceLabel =
        activeTab === 'message'
          ? 'Payment message'
          : activeTab === 'invoice'
          ? 'Bill / Invoice'
          : 'Payment details';
      const structured = structurePaymentContext(text, sourceLabel);
      setCapturedContext(structured);
      savePaymentContext(structured);
    } else {
      setCapturedContext(null);
    }
  };

  // Demo shortcut handler
  const handleApplyDemo = () => {
    setActiveTab('message');
    setMessageInput(DEMO_SCENARIO.message);
    const structured = structurePaymentContext(
      DEMO_SCENARIO.message,
      DEMO_SCENARIO.source
    );
    setCapturedContext(structured);
    savePaymentContext(structured);
  };

  // Clear input handler
  const handleClear = () => {
    setMessageInput('');
    setCapturedContext(null);
  };

  // Navigate to analysis with context passed in state
  const handleContinue = () => {
    if (!capturedContext) return;
    savePaymentContext(capturedContext);
    navigate('/analysis', { state: { paymentContext: capturedContext } });
  };

  const tabs = [
    { id: 'message', label: 'Payment Message', icon: MessageSquareText },
    { id: 'invoice', label: 'Bill / Invoice', icon: FileText },
    { id: 'details', label: 'Payment Details', icon: CreditCard },
  ];

  return (
    <ScreenTransition>
      <PageHeader
        title="Check a Payment"
        subtitle="Tell Sentinel what you were expecting to pay."
        showBack={true}
        backTo="/"
      />

      <div className="flex-1 px-4 py-5 space-y-5 pb-12">
        {/* ==================================================
            SOURCE SELECTION TABS
            ================================================== */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
            Context Source
          </label>
          <div
            role="tablist"
            aria-label="Payment Context Source"
            className="grid grid-cols-3 gap-1 p-1 bg-[#12151B] border border-white/[0.08] rounded-xl"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (messageInput.trim().length > 0) {
                      const structured = structurePaymentContext(
                        messageInput,
                        tab.label
                      );
                      setCapturedContext(structured);
                    }
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 px-1 text-[11px] font-medium rounded-lg transition-all duration-150 select-none cursor-pointer ${
                    isActive
                      ? 'bg-[#1E232E] text-amber-400 border border-white/[0.1] shadow-xs'
                      : 'text-[#94A3B8] hover:text-[#F3F4F6] hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            CONTEXT INPUT AREA
            ================================================== */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="context-input"
              className="text-xs font-semibold text-[#F3F4F6]"
            >
              {activeTab === 'message'
                ? 'Payment Message or Instruction'
                : activeTab === 'invoice'
                ? 'Bill or Invoice Context'
                : 'Expected Payment Notes'}
            </label>

            {/* Subtle Demo Scenario Button */}
            <button
              type="button"
              onClick={handleApplyDemo}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 text-amber-400 hover:text-amber-300 text-[10px] font-mono transition-colors cursor-pointer"
              title="Auto-fill electricity bill demo scenario"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Use Demo Scenario</span>
            </button>
          </div>

          <div className="relative">
            <textarea
              id="context-input"
              rows={4}
              value={messageInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={
                activeTab === 'message'
                  ? 'Paste message or notification (e.g. "Please pay your electricity bill of ₹840.")'
                  : activeTab === 'invoice'
                  ? 'Enter invoice summary or bill reference (e.g. "BESCOM Bill ₹840 due today")'
                  : 'Enter expected amount and merchant purpose...'
              }
              className="w-full bg-[#12151B] border border-white/[0.08] focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-sm text-[#F3F4F6] placeholder-[#64748B] rounded-xl p-3.5 leading-relaxed outline-none transition-all resize-none"
            />

            {messageInput && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear context input"
                className="absolute top-3 right-3 p-1 rounded-md bg-[#181C24] hover:bg-[#202632] text-[#94A3B8] hover:text-[#F3F4F6] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#64748B]">
            <span>
              {activeTab === 'message'
                ? 'Paste the message telling you to pay'
                : 'Declare the intended payment parameters'}
            </span>
            <span className="font-mono">{messageInput.length} chars</span>
          </div>
        </div>

        {/* ==================================================
            CONTEXT CAPTURED PREVIEW
            ================================================== */}
        {capturedContext ? (
          <Section
            eyebrow="Extracted Intent"
            title="Payment context"
            action={
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-[9px] uppercase tracking-wide">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Context captured</span>
              </div>
            }
          >
            <Card
              variant="default"
              padding="none"
              className="divide-y divide-white/[0.06] border-white/[0.1] bg-[#12151B]"
            >
              {/* Purpose */}
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <span className="text-xs text-[#94A3B8] font-normal">
                  Purpose
                </span>
                <span className="text-xs font-semibold text-[#F3F4F6] text-right truncate">
                  {capturedContext.purpose}
                </span>
              </div>

              {/* Expected amount */}
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <span className="text-xs text-[#94A3B8] font-normal">
                  Expected amount
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 text-right">
                  {capturedContext.expectedAmount}
                </span>
              </div>

              {/* Expected recipient */}
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <span className="text-xs text-[#94A3B8] font-normal">
                  Expected recipient
                </span>
                <span className="text-xs font-medium text-[#F3F4F6] text-right truncate">
                  {capturedContext.expectedRecipient}
                </span>
              </div>

              {/* Source */}
              <div className="px-4 py-3 flex items-center justify-between gap-3 bg-black/20">
                <span className="text-xs text-[#64748B] font-normal">
                  Source
                </span>
                <span className="font-mono text-[11px] text-[#94A3B8] text-right">
                  {capturedContext.source}
                </span>
              </div>
            </Card>
          </Section>
        ) : (
          <Card
            variant="subtle"
            padding="md"
            className="text-center py-6 border-dashed border-white/[0.08] space-y-1.5"
          >
            <p className="text-xs text-[#94A3B8]">
              No payment context captured yet
            </p>
            <p className="text-[11px] text-[#64748B]">
              Enter a payment message above or use the demo scenario to proceed.
            </p>
          </Card>
        )}

        {/* ==================================================
            TRUST / PRIVACY NOTE
            Understated, honest, no exaggerated claims
            ================================================== */}
        <div className="p-3 rounded-xl bg-[#0E1015] border border-white/[0.05] flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-[#94A3B8] shrink-0" />
          <p className="text-[11px] text-[#94A3B8] leading-normal">
            Your payment context stays within this Sentinel check.
          </p>
        </div>

        {/* ==================================================
            PRIMARY ACTION
            ================================================== */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            disabled={!capturedContext}
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleContinue}
            className="w-full text-sm font-semibold shadow-md shadow-amber-950/20"
          >
            Continue to Analysis
          </Button>
          {!capturedContext && (
            <p className="text-center text-[10px] text-[#64748B] mt-2 font-mono">
              Provide context above to enable analysis
            </p>
          )}
        </div>
      </div>
    </ScreenTransition>
  );
}

export default CheckPayment;
