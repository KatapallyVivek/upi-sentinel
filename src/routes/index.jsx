import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CheckPayment from '../pages/CheckPayment';
import AnalysisPlaceholder from '../pages/AnalysisPlaceholder';
import ResultPlaceholder from '../pages/ResultPlaceholder';
import VerifyProofPlaceholder from '../pages/VerifyProofPlaceholder';
import NotFound from '../pages/NotFound';

/**
 * Primary routing configuration for UPI Sentinel.
 * Phase 1 features the complete Home route and structured placeholders.
 * Phase 2 implements the full /check-payment flow.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/check-payment" element={<CheckPayment />} />
      <Route path="/analysis" element={<AnalysisPlaceholder />} />
      <Route path="/result" element={<ResultPlaceholder />} />
      <Route path="/verify-proof" element={<VerifyProofPlaceholder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
