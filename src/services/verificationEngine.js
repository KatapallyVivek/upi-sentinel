
export function parseUPIUri(uri) {
  if (!uri || !uri.startsWith('upi://pay')) {
    return null;
  }

    try {
    const url = new URL(uri);
    const amount = url.searchParams.get('am');
    const currency = url.searchParams.get('cu') || 'INR';
    const recipient = url.searchParams.get('pa');
    const recipientName = url.searchParams.get('pn');

    return {
      amount: amount ? parseFloat(amount) : null,
      currency,
      recipient,
      recipientName,
      action: 'SEND', 
    };
  } catch (e) {
    return null;
  }
}

export function verifyPayment(expectedIntent, actualPayment) {
  const flags = [];
  let riskLevel = 'MATCH';
  const evidence = [];

  if (!expectedIntent || !actualPayment) {
    return {
      riskLevel: 'HIGH_RISK',
      flags: ['INVALID_DATA'],
      evidence: ['Missing expected intent or actual payment data.']
    };
  }

  if (expectedIntent.amount !== null && actualPayment.amount !== null) {
    if (expectedIntent.amount !== actualPayment.amount) {
      flags.push('AMOUNT_MISMATCH');
      evidence.push(`You were asked to pay ₹${expectedIntent.amount}, but this QR requests ₹${actualPayment.amount}.`);
    }
  }

  if (expectedIntent.action !== 'UNKNOWN' && actualPayment.action !== 'UNKNOWN') {
    if (expectedIntent.action !== actualPayment.action) {
      flags.push('ACTION_MISMATCH');
      evidence.push(`You expected to ${expectedIntent.action.toLowerCase()} money, but this QR would make you ${actualPayment.action.toLowerCase()} money.`);
    }
  }

  if (expectedIntent.recipient && actualPayment.recipient) {
    const expectedLower = expectedIntent.recipient.toLowerCase();
    const actualPayeeLower = actualPayment.recipient.toLowerCase();
    const actualNameLower = (actualPayment.recipientName || '').toLowerCase();

    if (!actualPayeeLower.includes(expectedLower) && !actualNameLower.includes(expectedLower)) {
      flags.push('RECIPIENT_MISMATCH');
      evidence.push(`Recipient does not match the expected payment context. Expected: ${expectedIntent.recipient}, Actual: ${actualPayment.recipient}`);
    }
  }

  if (flags.length > 0) {
    if (flags.includes('AMOUNT_MISMATCH') || flags.includes('ACTION_MISMATCH') || flags.includes('RECIPIENT_MISMATCH')) {
      riskLevel = 'HIGH_RISK';
    } else {
      riskLevel = 'CAUTION';
    }
  }

  return {
    riskLevel,
    flags,
    evidence
  };
}
