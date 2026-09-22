import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import Card from '../ui/Card';

export default function AnalysisLoading({ onComplete }) {
  const steps = [
    'Reading context',
    'Identifying payment amount',
    'Understanding payment action',
    'Extracting recipient',
    'Building payment intent'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 400); // Small pause before transitioning
          return prev;
        }
        return prev + 1;
      });
    }, 400); // 400ms per step

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in duration-300">
      <div className="relative">
        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-[#1A1E27] border border-amber-500/30 flex items-center justify-center relative z-10 shadow-lg shadow-amber-900/20">
          <Cpu className="w-8 h-8 text-amber-400" />
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-lg font-bold text-[#F3F4F6]">
          Analyzing payment context...
        </h3>
        <p className="text-xs text-[#94A3B8]">
          Extracting intent parameters securely.
        </p>
      </div>

      <Card variant="default" padding="md" className="w-full bg-[#12151B] border-white/[0.08]">
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isPending = index > currentStepIndex;

            return (
              <div 
                key={step} 
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  isCompleted ? 'text-[#F3F4F6]' : 
                  isCurrent ? 'text-amber-400 font-medium' : 
                  'text-[#64748B]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-white/[0.1]" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
          
          <div className={`pt-2 mt-2 border-t border-white/[0.08] transition-opacity duration-500 ${currentStepIndex >= steps.length ? 'opacity-100' : 'opacity-0'}`}>
             <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
               <CheckCircle2 className="w-4 h-4" />
               <span>Payment intent detected</span>
             </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
