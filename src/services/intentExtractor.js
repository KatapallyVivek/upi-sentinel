
export function extractIntent(text) {
  if (!text || !text.trim()) {
    return {
      amount: null,
      currency: "INR",
      purpose: null,
      action: "UNKNOWN",
      recipient: null,
      confidence: "LOW",
      sourceText: text || "",
    };
  }

  const normalized = text.trim();
  const lower = normalized.toLowerCase();

  const amountRegex = /(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)\s*(?:rupees|inr)?/i;
  let amountMatch = normalized.match(amountRegex);
  let amount = null;

  const allAmountsRegex = /(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*(?:\.\d{1,2})?)\s*(?:rupees|inr)?/gi;
  const allAmounts = [...normalized.matchAll(allAmountsRegex)];

    if (allAmounts.length > 0) {
    amount = parseFloat(allAmounts[0][1].replace(/,/g, ''));
  }

  let action = "UNKNOWN";

    const receiveKeywords = ["i will send you", "receive", "send me"];

    if (receiveKeywords.some(kw => lower.includes(kw))) {
    action = "RECEIVE";
  } else if (
    lower.includes("pay") || 
    lower.includes("send to") || 
    lower.match(/send\s+(?:rs|₹|\d)/i) ||
    lower.includes("send")
  ) {
    action = "SEND";
  }

  let purpose = null;
  if (lower.includes("electricity") || lower.includes("bescom")) {
    purpose = "Electricity Bill";
  } else if (lower.includes("rent")) {
    purpose = "Rent";
  } else if (lower.includes("fee") || lower.includes("college")) {
    purpose = "Education Fee";
  } else if (lower.includes("transfer") || lower.includes("send") || lower.includes("receive")) {
    purpose = "Money Transfer";
  }

  let recipient = null;
  const upiRegex = /([a-zA-Z0-9.\-_]+@[a-zA-Z]+)/;
  const upiMatch = normalized.match(upiRegex);

    if (upiMatch) {
    recipient = upiMatch[1];
  } else {
    const toMatch = normalized.match(/to\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)/);
    if (toMatch) {
      recipient = toMatch[1];
    } else {
      const simpleToMatch = lower.match(/to\s+([a-z]+)/);
      if (simpleToMatch && !["the", "my", "your", "a", "an", "receive", "pay"].includes(simpleToMatch[1])) {
        recipient = simpleToMatch[1].charAt(0).toUpperCase() + simpleToMatch[1].slice(1);
      }
    }
  }

  let confidence = "LOW";
  let foundFields = 0;
  if (amount !== null) foundFields++;
  if (action !== "UNKNOWN") foundFields++;
  if (purpose !== null) foundFields++;
  if (recipient !== null) foundFields++;

  if (foundFields >= 3) {
    confidence = "HIGH";
  } else if (foundFields >= 1) {
    confidence = "MEDIUM";
  }

  return {
    amount,
    currency: "INR",
    purpose,
    action,
    recipient,
    confidence,
    sourceText: normalized,
  };
}
