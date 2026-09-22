import { describe, it, expect } from 'vitest';
import { parseScreenshot } from './screenshotParser';

describe('screenshotParser', () => {
  it('Parses successful fake screenshot text', () => {
    const text = 'Payment Successful\nPaid to Rahul\n₹840.00\nTXN1234567890';
    const parsed = parseScreenshot(text);

        expect(parsed.claimedStatus).toBe('SUCCESS');
    expect(parsed.amount).toBe(840);
    expect(parsed.recipient).toBe('Rahul');
    expect(parsed.transactionId).toBe('TXN1234567890');
  });
});
