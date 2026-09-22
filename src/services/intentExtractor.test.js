import { describe, it, expect } from 'vitest';
import { extractIntent } from './intentExtractor';

describe('extractIntent', () => {
  it('1. ₹840 electricity bill -> SEND', () => {
    const result = extractIntent('Please pay ₹840 for the electricity bill.');
    expect(result.amount).toBe(840);
    expect(result.action).toBe('SEND');
    expect(result.purpose).toBe('Electricity Bill');
    expect(result.recipient).toBe(null);
  });

  it('2. ₹5,000 receive scenario -> RECEIVE', () => {
    const result = extractIntent('I will send you ₹5,000. Scan this QR to receive it.');
    expect(result.amount).toBe(5000);
    expect(result.action).toBe('RECEIVE');
  });

  it('3. UPI ID extraction', () => {
    const result = extractIntent('Pay ₹1,200 to abc@upi.');
    expect(result.amount).toBe(1200);
    expect(result.action).toBe('SEND');
    expect(result.recipient).toBe('abc@upi');
  });

  it('4. Recipient name extraction', () => {
    const result = extractIntent('Please send ₹2,000 to Rahul.');
    expect(result.amount).toBe(2000);
    expect(result.action).toBe('SEND');
    expect(result.recipient).toBe('Rahul');
  });

  it('5. Missing amount', () => {
    const result = extractIntent('Please pay your electricity bill.');
    expect(result.amount).toBe(null);
    expect(result.action).toBe('SEND');
    expect(result.purpose).toBe('Electricity Bill');
  });

  it('6. Missing recipient', () => {
    const result = extractIntent('Send ₹500 for the rent.');
    expect(result.amount).toBe(500);
    expect(result.action).toBe('SEND');
    expect(result.purpose).toBe('Rent');
    expect(result.recipient).toBe(null);
  });

  it('7. Unknown action', () => {
    const result = extractIntent('This is ₹500.');
    expect(result.amount).toBe(500);
    expect(result.action).toBe('UNKNOWN');
  });

  it('8. OCR/noisy text', () => {
    const result = extractIntent('TOTAL DUE: Rs. 1,000 PLEASE PAY IMMEDIATELY');
    expect(result.amount).toBe(1000);
    expect(result.action).toBe('SEND');
  });

  it('9. Multiple amounts', () => {
    const result = extractIntent('Pay ₹500 and another ₹200 to Rahul');
    expect(result.amount).toBe(500);
    expect(result.action).toBe('SEND');
    expect(result.recipient).toBe('Rahul');
  });

  it('10. Empty input', () => {
    const result = extractIntent('');
    expect(result.amount).toBe(null);
    expect(result.action).toBe('UNKNOWN');
    expect(result.purpose).toBe(null);
    expect(result.recipient).toBe(null);
  });
});
