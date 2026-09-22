/**
 * Payment Context Data Structure and Utilities for UPI Sentinel.
 * 
 * In Phase 2, this module captures and structures the expected payment intent
 * before routing to analysis in Phase 3.
 */

export const DEMO_SCENARIO = {
  id: 'electricity-bill',
  source: 'Payment message',
  message: 'Please pay your electricity bill of ₹840.',
  purpose: 'Electricity Bill',
  expectedAmount: '₹840',
  expectedAmountValue: 840,
  expectedRecipient: 'Electricity Provider',
};

const STORAGE_KEY = 'upi_sentinel_captured_context';

/**
 * Persists the captured payment context in session storage.
 * @param {Object} context 
 */
export function savePaymentContext(context) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch {
    // Graceful fallback for non-storage environments
  }
}

/**
 * Retrieves the captured payment context from session storage.
 * @returns {Object|null}
 */
export function getPaymentContext() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Clear captured payment context
 */
export function clearPaymentContext() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * Structures an input message into a standardized payment context object.
 * Handles the primary demo scenario with exact matching and provides
 * a clean fallback extraction for arbitrary input text.
 * 
 * @param {string} text - The raw message or input text
 * @param {string} source - The context source (e.g. 'Payment message')
 * @returns {Object|null}
 */
export function structurePaymentContext(text, source = 'Payment message') {
  if (!text || !text.trim()) return null;

  const normalized = text.trim();

  // Primary demo scenario match
  if (
    normalized.toLowerCase().includes('electricity') ||
    normalized.includes('840')
  ) {
    return {
      source,
      message: normalized,
      purpose: 'Electricity Bill',
      expectedAmount: '₹840',
      expectedAmountValue: 840,
      expectedRecipient: 'Electricity Provider',
      capturedAt: new Date().toISOString(),
    };
  }

  // Basic regex fallback to extract amount like ₹500 or 500
  const amountMatch = normalized.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)/i);
  const detectedAmount = amountMatch ? `₹${amountMatch[1]}` : 'Unspecified';

  // Identify general purpose category
  let detectedPurpose = 'General Payment';
  const lower = normalized.toLowerCase();
  if (lower.includes('bill') || lower.includes('utility')) detectedPurpose = 'Utility Bill';
  else if (lower.includes('rent')) detectedPurpose = 'House Rent';
  else if (lower.includes('recharge') || lower.includes('mobile')) detectedPurpose = 'Mobile Recharge';
  else if (lower.includes('fee') || lower.includes('tuition')) detectedPurpose = 'Education Fee';
  else if (lower.includes('cab') || lower.includes('uber') || lower.includes('ola')) detectedPurpose = 'Cab Fare';

  return {
    source,
    message: normalized,
    purpose: detectedPurpose,
    expectedAmount: detectedAmount,
    expectedAmountValue: amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null,
    expectedRecipient: 'Merchant / Recipient',
    capturedAt: new Date().toISOString(),
  };
}
