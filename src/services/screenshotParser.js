
export function parseScreenshot(text) {
  const lower = text.toLowerCase();

    let claimedStatus = 'UNKNOWN';
  if (lower.includes('success') || lower.includes('paid')) {
    claimedStatus = 'SUCCESS';
  } else if (lower.includes('fail')) {
    claimedStatus = 'FAILED';
  }

  const amountRegex = /(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)/i;
  const amountMatch = text.match(amountRegex);
  const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null;

  const txnRegex = /\b(\d{12}|TXN[A-Z0-9]+)\b/i;
  const txnMatch = text.match(txnRegex);
  const transactionId = txnMatch ? txnMatch[1] : 'NOT FOUND';

  let recipient = 'Unknown';
  if (lower.includes('paid to')) {
    const toMatch = text.match(/paid to\s+([A-Za-z\s]+)/i);
    if (toMatch) {
      recipient = toMatch[1].trim();
    }
  }

  return {
    claimedStatus,
    amount,
    recipient,
    transactionId
  };
}
