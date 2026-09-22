
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

export function savePaymentContext(context) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch {
  }
}

export function getPaymentContext() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPaymentContext() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
  }
}

export function structurePaymentContext(text, source = 'Payment message') {
  if (!text || !text.trim()) return null;

  const normalized = text.trim();

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

  const amountMatch = normalized.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)/i);
  const detectedAmount = amountMatch ? `₹${amountMatch[1]}` : 'Unspecified';

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
