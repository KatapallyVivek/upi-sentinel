import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, UploadCloud, AlertOctagon } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { parseScreenshot } from '../services/screenshotParser';

export default function VerifyProofScreen() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    const parsed = parseScreenshot(inputText);
    setAnalysis(parsed);
  };

  const handleReset = () => {
    setInputText('');
    setAnalysis(null);
  };

  return (
    <ScreenTransition>
      <PageHeader
        title="Screenshot Proof"
        subtitle="Verify payment success claims"
        showBack={true}
        backTo="/"
      />

      <div className="flex-1 px-4 py-6 space-y-6 flex flex-col justify-between">
        
        {!analysis ? (
          <div className="space-y-5 flex-1">
            <Card variant="subtle" padding="md" className="space-y-2 border-white/[0.08]">
              <h3 className="text-sm font-semibold text-[#F3F4F6]">OCR Text Input (Demo)</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Paste the text extracted from the payment screenshot to verify its authenticity.
              </p>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g. Payment Successful&#10;Paid to ABC Electricity&#10;₹840.00&#10;TXN1234567890"
                rows={5}
                className="w-full bg-[#12151B] border border-white/[0.08] focus:border-amber-500/50 text-xs font-mono text-[#F3F4F6] p-3 rounded-lg outline-none resize-none"
              />
            </Card>
            
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-amber-950/25"
              onClick={handleAnalyze}
              icon={UploadCloud}
            >
              Analyze Screenshot
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <Card variant="default" padding="lg" className="border-white/[0.08]">
              <h2 className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-4">
                PAYMENT SCREENSHOT ANALYSIS
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm border-b border-white/[0.06] pb-2">
                  <span className="text-[#94A3B8]">Claimed Status</span>
                  <span className={`font-bold ${analysis.claimedStatus === 'SUCCESS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysis.claimedStatus}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm border-b border-white/[0.06] pb-2">
                  <span className="text-[#94A3B8]">Amount</span>
                  <span className="font-mono font-bold text-[#F3F4F6]">
                    {analysis.amount ? `₹${analysis.amount}` : 'Not found'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm border-b border-white/[0.06] pb-2">
                  <span className="text-[#94A3B8]">Recipient</span>
                  <span className="font-medium text-[#F3F4F6]">{analysis.recipient}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm pb-2">
                  <span className="text-[#94A3B8]">Transaction ID</span>
                  <span className="font-mono text-[#F3F4F6] text-xs">{analysis.transactionId}</span>
                </div>
              </div>
            </Card>

            <Card variant="warning" padding="lg" className="border-amber-500/30 bg-amber-950/20">
              <div className="flex items-start gap-3">
                <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wide">
                    PAYMENT NOT VERIFIED
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                    The screenshot claims payment success, but Sentinel could not independently verify the transaction on the banking network.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3 pt-4">
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                onClick={handleReset}
              >
                Analyze Another
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-[#94A3B8]"
                icon={ArrowLeft}
                onClick={() => navigate('/')}
              >
                Go Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </ScreenTransition>
  );
}
