export function clamp(n: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, n));
}

/** Saturating sufficiency. Equals 1 at `crit`, falls toward 0 below it. */
export function sufficiency(pool: number, crit: number): number {
  if (crit <= 0) return 1;
  const x = Math.max(0, pool);
  return clamp((1.5 * x) / (x + 0.5 * crit), 0, 1);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
