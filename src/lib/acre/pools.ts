import type { Pools } from "@/lib/acre/types";

export const DEFAULT_POOLS: Pools = {
  no3: 25,
  nh4: 12,
  orgN: 140,
  inertN: 2800,
  labileP: 28,
  orgP: 55,
  inertP: 640,
  exchK: 240,
  orgK: 40,
  fixedK: 3200,
  ca: 1800,
  mg: 220,
  s: 28,
  fe: 12000,
  mn: 4000,
  zn: 1800,
  cu: 800,
  b: 400,
  mo: 28,
  cl: 3500,
};

export function clonePools(p: Pools): Pools {
  return { ...p };
}

export function zeroFlux() {
  return {
    mineralizationN: 0,
    nitrification: 0,
    denitrification: 0,
    volatilization: 0,
    leachingN: 0,
    fixation: 0,
    uptakeN: 0,
    uptakeP: 0,
    uptakeK: 0,
    mineralizationP: 0,
  };
}

export function calmStress() {
  return {
    temperature: 1,
    water: 1,
    nitrogen: 1,
    phosphorus: 1,
    potassium: 1,
    ph: 1,
    salinity: 1,
    micronutrient: 1,
    calcium: 1,
    magnesium: 1,
    sulfur: 1,
    pests: 1,
    microName: "—",
  };
}
