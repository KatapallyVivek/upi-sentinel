import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, ArrowLeft, Scan, RefreshCcw } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { parseUPIUri, verifyPayment } from '../services/verificationEngine';

export default function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const paymentIntent = location.state?.paymentIntent;

  const [qrInput, setQrInput] = useState('');
  const [actualPayment, setActualPayment] = useState(null);
  const [result, setResult] = useState(null);


  useEffect(() => {
    if (!paymentIntent) {
      navigate('/');
    }
  }, [paymentIntent, navigate]);

  const handleVerify = () => {
    if (!qrInput.trim()) return;
    
    const parsed = parseUPIUri(qrInput.trim());
    if (parsed) {
      setActualPayment(parsed);
      const verification = verifyPayment(paymentIntent, parsed);
      setResult(verification);
    } else {

      setResult({
        riskLevel: 'HIGH_RISK',
        flags: ['INVALID_QR'],
        evidence: ['The scanned QR code is not a valid UPI payment request.']
      });
      setActualPayment({ amount: null, recipient: 'Unknown', action: 'UNKNOWN' });
    }
  };

  const handleReset = () => {
    setQrInput('');
    setActualPayment(null);
    setResult(null);
  };

  if (!paymentIntent) return null;

  return (
    <ScreenTransition>
      <PageHeader
        title="Payment Verification"
        subtitle="Comparing context vs actual payment"
        showBack={true}
        backTo="/analysis"
      />

      <div className="flex-1 px-4 py-6 space-y-6 flex flex-col justify-between">
        
        {!result ? (
          <div className="space-y-6 flex-1">
            <Card variant="subtle" padding="md" className="space-y-2 border-white/[0.08]">
              <h3 className="text-sm font-semibold text-[#F3F4F6]">Simulate QR Scan</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Since camera access is simulated for this demo, paste the UPI URI below.
              </p>
              <textarea
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                placeholder="upi://pay?pa=...&am=..."
                rows={3}
                className="w-full bg-[#12151B] border border-white/[0.08] focus:border-amber-500/50 text-xs font-mono text-[#F3F4F6] p-3 rounded-lg outline-none resize-none"
              />
            </Card>
            
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-amber-950/25"
              onClick={handleVerify}
              icon={Scan}
            >
              Verify Payment
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            

            {result.riskLevel === 'MATCH' && (
              <Card variant="interactive" padding="lg" className="border-emerald-500/30 bg-emerald-950/20">
                <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-emerald-400 uppercase tracking-wide">
                      Context Matches
                    </h2>
                    <p className="text-xs text-emerald-200/70">
                      No mismatch detected between your payment context and this QR.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#94A3B8]">Expected</span>
                    <span className="font-mono font-bold text-[#F3F4F6]">₹{paymentIntent.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#94A3B8]">Actual</span>
                    <span className="font-mono font-bold text-[#F3F4F6]">₹{actualPayment.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-white/[0.06]">
                    <span className="text-[#94A3B8]">Recipient</span>
                    <span className="font-medium text-[#F3F4F6] truncate max-w-[60%]">{actualPayment.recipientName || actualPayment.recipient}</span>
                  </div>
                </div>
              </Card>
            )}


            {result.riskLevel === 'HIGH_RISK' && (
              <Card variant="warning" padding="lg" className="border-red-500/40 bg-[#1A0A0A]">
                <div className="flex flex-col items-center text-center gap-2 border-b border-red-500/20 pb-5 mb-5">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-1 animate-pulse">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-red-500 uppercase tracking-widest">
                    ⚠ HIGH RISK
                  </h2>
                  <p className="text-sm font-semibold text-red-200">
                    Payment Intent Mismatch
                  </p>
                </div>

                <div className="space-y-4">
                  {result.evidence.map((evidenceText, i) => (
                    <div key={i} className="p-3 bg-red-950/40 border border-red-500/20 rounded-lg text-sm text-red-200/90 leading-relaxed">
                      {evidenceText}
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-2">Recommendation:</p>
                    <p className="text-sm text-[#F3F4F6]">
                      Do not continue until you verify the payment details independently.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-3 pt-4">
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                icon={RefreshCcw}
                onClick={handleReset}
              >
                Scan Again
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
