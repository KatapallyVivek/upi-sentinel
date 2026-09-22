import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CheckPayment from '../pages/CheckPayment';
import IntentAnalysisFlow from '../pages/IntentAnalysisFlow';
import ResultScreen from '../pages/ResultScreen';
import VerifyProofScreen from '../pages/VerifyProofScreen';
import NotFound from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/check-payment" element={<CheckPayment />} />
      <Route path="/analysis" element={<IntentAnalysisFlow />} />
      <Route path="/result" element={<ResultScreen />} />
      <Route path="/verify-proof" element={<VerifyProofScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
