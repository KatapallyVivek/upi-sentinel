import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import ScreenTransition from '../components/layout/ScreenTransition';
import AnalysisLoading from '../components/analysis/AnalysisLoading';
import IntentPreview from '../components/analysis/IntentPreview';
import { getPaymentContext } from '../data/paymentContext';
import { extractIntent } from '../services/intentExtractor';

export default function IntentAnalysisFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [intent, setIntent] = useState(null);

  useEffect(() => {

    const capturedContext = location.state?.paymentContext || getPaymentContext();
    const sourceText = capturedContext?.message || "";


    const extracted = extractIntent(sourceText);
    setIntent(extracted);
  }, [location.state]);

  const handleAnalysisComplete = () => {
    setLoading(false);
  };

  const handleConfirmIntent = (confirmedIntent) => {

    navigate('/result', { state: { paymentIntent: confirmedIntent } });
  };

  return (
    <ScreenTransition>
      <PageHeader
        title="AI Analysis"
        subtitle="Extracting payment intent"
        showBack={true}
        backTo="/check-payment"
      />

      <div className="flex-1 px-4 py-6">
        {loading ? (
          <AnalysisLoading onComplete={handleAnalysisComplete} />
        ) : (
          <IntentPreview 
            intent={intent} 
            onConfirm={handleConfirmIntent} 
          />
        )}
      </div>
    </ScreenTransition>
  );
}
