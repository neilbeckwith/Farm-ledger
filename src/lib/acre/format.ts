export function ledgerTime(day: number) {
  const safe = Number.isFinite(day) ? Math.max(0, day) : 0;
  const whole = Math.floor(safe);
  return {
    day: whole,
    frac: safe - whole,
    week: Math.floor(whole / 7) + 1,
    month: Math.floor(whole / 30.436875) + 1,
    year: Math.floor(whole / 365.2425) + 1,
  };
}

export function formatMass(kg: number): string {
  if (!Number.isFinite(kg)) return "—";
  const abs = Math.abs(kg);
  const n =
    abs >= 10000 ? `${(abs / 1000).toFixed(1)} t` :
    abs >= 1000 ? `${(abs / 1000).toFixed(2)} t` :
    abs >= 10 ? `${abs.toFixed(0)} kg` :
    `${abs.toFixed(1)} kg`;
  return kg < 0 ? `−${n}` : n;
}

export function formatArea(m2: number): string {
  if (m2 < 100) return `${Math.round(m2)} m²`;
  const ha = m2 / 10000;
  const ac = m2 / 4046.8564224;
  const haText = ha >= 10 ? ha.toFixed(1) : ha.toFixed(2);
  const acText = ac >= 10 ? ac.toFixed(0) : ac.toFixed(1);
  return `${haText} ha · ${acText} ac`;
}

export function paceLabel(speed: number): string {
  if (speed <= 0) return "Paused";
  const sec = 10 / speed;
  if (sec >= 9.5) return "10 s / day";
  if (sec >= 1) return `${sec.toFixed(1)} s / day`;
  return `${sec.toFixed(2)} s / day`;
}

export function formatFlux(n: number): string {
  if (!Number.isFinite(n) || Math.abs(n) < 0.005) return "0.00";
  return n.toFixed(2);
}

export function tHa(kgPerM2: number): string {
  const t = kgPerM2 * 10;
  if (!Number.isFinite(t)) return "—";
  return t >= 10 ? t.toFixed(1) : t.toFixed(2);
}
