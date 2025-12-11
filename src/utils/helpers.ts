export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function toNumber(val: unknown): number | null {
  const num = Number(val);
  return isNaN(num) ? null : num;
}
