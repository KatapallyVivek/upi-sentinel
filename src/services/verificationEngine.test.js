import { describe, it, expect } from 'vitest';
import { parseUPIUri, verifyPayment } from './verificationEngine';

describe('verificationEngine', () => {
  it('Parses UPI URI correctly', () => {
    const uri = 'upi://pay?pa=merchant@upi&pn=ABC%20Store&am=840&cu=INR';
    const parsed = parseUPIUri(uri);
    expect(parsed.amount).toBe(840);
    expect(parsed.recipient).toBe('merchant@upi');
    expect(parsed.recipientName).toBe('ABC Store');
    expect(parsed.action).toBe('SEND');
  });

  it('TEST 1: Amount mismatch', () => {
    const expected = {
      amount: 840,
      action: 'SEND',
      purpose: 'Electricity Bill',
      recipient: null
    };
    const actual = parseUPIUri('upi://pay?pa=random@upi&pn=Random&am=8400&cu=INR');

        const result = verifyPayment(expected, actual);
    expect(result.riskLevel).toBe('HIGH_RISK');
    expect(result.flags).toContain('AMOUNT_MISMATCH');
  });

  it('TEST 2: Action mismatch', () => {
    const expected = {
      amount: 5000,
      action: 'RECEIVE',
      purpose: null,
      recipient: null
    };
    const actual = parseUPIUri('upi://pay?pa=random@upi&pn=Random&am=5000&cu=INR');

        const result = verifyPayment(expected, actual);
    expect(result.riskLevel).toBe('HIGH_RISK');
    expect(result.flags).toContain('ACTION_MISMATCH');
  });

  it('TEST 3: Match', () => {
    const expected = {
      amount: 840,
      action: 'SEND',
      purpose: 'Electricity Bill',
      recipient: 'abc@upi'
    };
    const actual = parseUPIUri('upi://pay?pa=abc@upi&pn=ABC%20Electricity&am=840&cu=INR');

        const result = verifyPayment(expected, actual);
    expect(result.riskLevel).toBe('MATCH');
    expect(result.flags.length).toBe(0);
  });
});
