export function formatINR(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.includes("₹")) return trimmed;
  if (/unpaid|paid|negotiable|stipend/i.test(trimmed) && !/\d/.test(trimmed)) {
    return trimmed;
  }

  const numeric = trimmed.replace(/[^\d.]/g, "");
  if (!numeric) return trimmed;
  const amount = Number(numeric);
  if (!Number.isFinite(amount)) return trimmed;

  const formatted = `₹${amount.toLocaleString("en-IN")}`;
  if (/month/i.test(trimmed)) return `${formatted}/month`;
  return formatted;
}
