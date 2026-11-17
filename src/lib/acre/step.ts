import { calendarDoy, daylightPar, rainfall, temperature, waterHolding } from "@/lib/acre/climate";
import { clamp, sufficiency } from "@/lib/acre/math";
import { calmStress, clonePools, zeroFlux } from "@/lib/acre/pools";
import type { Crop, Drivers, Fluxes, HistPoint, Pools, SimState, Site, Stresses } from "@/lib/acre/types";

export function tempResponse(t: number, crop: Crop): number {
  if (t <= crop.tBase || t >= crop.tMax) return 0;
  const lo = crop.tOpt - Math.max(3, (crop.tOpt - crop.tBase) * 0.28);
  const hi = crop.tOpt + Math.max(4, (crop.tMax - crop.tOpt) * 0.38);
  if (t >= lo && t <= hi) return 1;
  if (t < lo) return clamp((t - crop.tBase) / Math.max(0.5, lo - crop.tBase), 0, 1);
  return clamp((crop.tMax - t) / Math.max(0.5, crop.tMax - hi), 0, 1);
}

function phAvailP(ph: number): number {
  const d = Math.abs(ph - 6.5);
  return Math.exp(-0.5 * (d / 1.05) ** 2);
}

function acidMicro(ph: number): number {
  if (ph <= 6.8) return 1;
  return Math.exp(-0.85 * (ph - 6.8));
}

function moMicro(ph: number): number {
  return clamp((ph - 4.4) / 2.6, 0.15, 1);
}

function phStressOf(ph: number, crop: Crop): number {
  const [lo, hi] = crop.phOpt;
  if (ph >= lo && ph <= hi) return 1;
  const d = ph < lo ? lo - ph : ph - hi;
  return clamp(1 - d / 1.7, 0, 1);
}

function take(pool: number, amount: number): [number, number] {
  const taken = Math.min(Math.max(0, pool), Math.max(0, amount));
  return [pool - taken, taken];
}

export function qualityOf(crop: Crop, development: number, shoot: number, econ: number): number {
  if (crop.perennial) {
    const early = clamp((development - 0.38) / 0.28, 0, 1);
    const late = development < 1 ? 1 : Math.exp(-(((development - 1) / 0.34) ** 2));
    const bulk = clamp(shoot / 0.16, 0, 1);
    return clamp(early * late * (0.45 + 0.55 * bulk), 0, 1);
  }
  const early = clamp((development - 0.7) / 0.28, 0, 1);
  const late = development <= 1.02 ? 1 : Math.exp(-(((development - 1.02) / 0.22) ** 2));
  const total = shoot + econ;
  const fill =
    crop.hi <= 0 ? 1 : clamp(econ / (crop.hi * Math.max(total, 0.02)), 0, 1);
  return clamp(early * late * (0.3 + 0.7 * fill), 0, 1);
}

export function stageName(crop: Crop, development: number, stubble: boolean): string {
  if (stubble) return "Stubble";
  for (const stage of crop.stages) {
    if (development < stage.until) return stage.name;
  }
  return crop.stages[crop.stages.length - 1]?.name ?? "Standing";
}

export function freshSim(drivers: Drivers, pools: Pools, site: Site): SimState {
  const whc = waterHolding(drivers.texture, drivers.compaction, drivers.om);
  return {
    day: 0,
    development: 0,
    shoot: 0,
    econ: 0,
    lai: 0,
    rootFrac: 0.02,
    water: whc * 0.72,
    pools: clonePools(pools),
    fluxes: zeroFlux(),
    stresses: calmStress(),
    limiter: "—",
    temperature: temperature(site, drivers.plantDoy, drivers.tempAnomaly),
    rainToday: 0,
    parToday: 0,
    doy: drivers.plantDoy,
    emerged: false,
    fixedN: 0,
    leachedN: 0,
    denitrifiedN: 0,
    mineralizedN: 0,
  };
}

function leafFraction(crop: Crop, development: number): number {
  if (crop.perennial) return 0.55;
  if (development < crop.reproAt) return 0.55;
  const t = clamp((development - crop.reproAt) / 0.45, 0, 1);
  return 0.55 * (1 - 0.72 * t);
}

const LIMIT_LABEL: Record<string, string> = {
  temperature: "temperature",
  water: "water",
  nitrogen: "nitrogen",
  phosphorus: "phosphorus",
  potassium: "potassium",
  ph: "pH",
  salinity: "salinity",
  micronutrient: "a micronutrient",
  calcium: "calcium",
  magnesium: "magnesium",
  sulfur: "sulfur",
  pests: "pests",
};

function limiterFrom(stresses: Stresses): string {
  const entries: [keyof Stresses, number][] = [
    ["temperature", stresses.temperature],
    ["water", stresses.water],
    ["nitrogen", stresses.nitrogen],
    ["phosphorus", stresses.phosphorus],
    ["potassium", stresses.potassium],
    ["ph", stresses.ph],
    ["salinity", stresses.salinity],
    ["micronutrient", stresses.micronutrient],
    ["calcium", stresses.calcium],
    ["magnesium", stresses.magnesium],
    ["sulfur", stresses.sulfur],
    ["pests", stresses.pests],
  ];
  let key: keyof Stresses = "temperature";
  let min = 2;
  for (const [k, v] of entries) {
    if (v < min) {
      min = v;
      key = k;
    }
  }
  if (min > 0.97) return "none — near potential";
  if (key === "micronutrient") return stresses.microName;
  return LIMIT_LABEL[key] ?? "resources";
}

/** Advance by `h` days (keep h ≤ 0.5). Pure. */
export function step(sim: SimState, h: number, drivers: Drivers, crop: Crop, site: Site): SimState {
  const pools = clonePools(sim.pools);
  const doy = calendarDoy(drivers.plantDoy, sim.day);
  const temp = temperature(site, doy, drivers.tempAnomaly);
  const rain = rainfall(site, doy, drivers.rainMul);
  const par = daylightPar(site, doy, drivers.radMul, rain);
  const whc = Math.max(40, waterHolding(drivers.texture, drivers.compaction, drivers.om));
  const tResp = tempResponse(temp, crop);
  const tQ = clamp(2 ** ((temp - 20) / 10), 0, 2.3);

  let water = sim.water;
  const sat0 = clamp(sim.water / whc, 0, 1.2);
  const moistF = sat0 < 0.15 ? (sat0 / 0.15) * 0.25 : sat0 > 0.9 ? 0.65 : 1;

  let development = sim.development;
  let shoot = sim.shoot;
  let econ = sim.econ;
  let emerged = sim.emerged;
  let rootFrac = sim.rootFrac;

  const dPh = phStressOf(drivers.ph, crop);
  let waterStress = sat0 >= 0.42 ? 1 : clamp(sat0 / 0.42, 0, 1);
  if (!crop.waterlogOk && sat0 > 0.9) waterStress *= clamp(1 - (sat0 - 0.9) * 2.2, 0.45, 1);
  if (crop.waterlogOk && sat0 > 0.7) waterStress = Math.max(waterStress, 0.95);

  let dD = (1 / crop.daysToMaturity) * tResp * (0.6 + 0.4 * waterStress);
  if (development < 0.06 && sat0 < 0.12) dD *= 0.15;
  development += dD * h;
  if (!crop.perennial && development >= 1 && tResp < 0.25) {
    development += 0.008 * h;
  }

  if (!emerged && development >= 0.06 && tResp > 0) {
    shoot = Math.max(shoot, crop.seedBiomass);
    emerged = true;
  }

  const rootTarget = clamp((development - 0.04) / 0.48, 0, 1) * (1 - 0.45 * drivers.compaction);
  rootFrac += (rootTarget - rootFrac) * (1 - Math.exp(-1.6 * h));
  const root = 0.18 + 0.82 * clamp(rootFrac, 0, 1);

  const leafFrac = leafFraction(crop, development);
  const lai = emerged ? Math.min(crop.maxLai, shoot * crop.sla * leafFrac) : 0;
  const kc = !emerged ? 0.2 : Math.min(1.15, 0.28 + 0.85 * clamp(lai / 3.6, 0, 1));
  const et0 = Math.max(0.2, 0.095 * Math.max(0, temp) * (par / 13) + 0.3);
  const etc = et0 * kc * (sat0 > 0.08 ? 1 : 0.35);
  water = water + (rain + drivers.irrigation - etc) * h;
  if (water < 0) water = 0;
  const sat = clamp(water / whc, 0, 1.4);
  const fpar = 1 - Math.exp(-0.5 * lai);
  const weedLight = 1 - 0.55 * clamp(drivers.weeds, 0, 1);
  const ipar = par * fpar * weedLight;
  const densRel = crop.optDensity > 0 ? drivers.density / crop.optDensity : 1;
  const densF = densRel <= 0.02 ? 0.02 : Math.min(1.08, densRel * Math.exp(1 - densRel));

  let pot = ((crop.rue * drivers.vigor * (0.86 + 0.14 * (1 - drivers.compaction)) * ipar) / 1000) * densF * tResp;
  if (emerged && lai < 1.4 && shoot > 0) {
    const juvenile = shoot * 0.085 * tResp * (0.5 + 0.5 * waterStress) * densF;
    pot = Math.max(pot, juvenile);
  }
  if (!crop.perennial && development > 1) {
    pot *= clamp(1 - (development - 1) / 0.18, 0, 1);
  }
  if (crop.maxShoot > 0 && shoot > crop.maxShoot * 0.82) {
    pot *= clamp((crop.maxShoot - shoot) / (crop.maxShoot * 0.18), 0, 1);
  }

  const demandN = pot * crop.nConc * 10000;
  const demandP = pot * crop.pConc * 10000;
  const demandK = pot * crop.kConc * 10000;

  const pH_P = phAvailP(drivers.ph);
  const myc = 0.4 + 1.05 * clamp(drivers.mycorrhizae, 0, 1);
  const weedN = 1 - 0.5 * clamp(drivers.weeds, 0, 1);
  const moistU = clamp(0.25 + 0.75 * Math.min(1, sat), 0.2, 1);

  const capN = (pools.no3 + pools.nh4) * 0.22 * root * moistU * weedN;
  const capP = pools.labileP * 0.07 * root * moistU * pH_P * myc;
  const capK = pools.exchK * 0.075 * root * moistU;

  const cover = clamp(lai / 2.4, 0, 1);
  const inorg = pools.no3 + pools.nh4;
  const suppression = inorg / (inorg + crop.fixHalfSat);
  const moF = sufficiency(pools.mo, 8) * moMicro(drivers.ph);
  const inoc = clamp(drivers.inoculation, 0, 1);
  const fixCap =
    crop.maxFix *
    inoc *
    cover *
    (1 - suppression) *
    moF *
    tResp *
    moistU *
    clamp(1 - Math.abs(drivers.ph - 6.6) / 3.2, 0, 1);

  const nFromSoil = Math.min(demandN, capN);
  const fixation = Math.min(Math.max(0, fixCap), Math.max(0, demandN - nFromSoil));
  const nStress = demandN < 0.02 ? 1 : clamp((nFromSoil + fixation) / demandN, 0, 1);
  const pStress = demandP < 0.005 ? 1 : clamp(Math.min(demandP, capP) / demandP, 0, 1);
  const kStress = demandK < 0.005 ? 1 : clamp(Math.min(demandK, capK) / demandK, 0, 1);

  const micros: { name: string; value: number }[] = [
    { name: "iron", value: sufficiency(pools.fe, 2500) * acidMicro(drivers.ph) },
    { name: "manganese", value: sufficiency(pools.mn, 800) * acidMicro(drivers.ph) },
    { name: "zinc", value: sufficiency(pools.zn, 400) * acidMicro(drivers.ph) },
    { name: "copper", value: sufficiency(pools.cu, 150) * acidMicro(drivers.ph) },
    { name: "boron", value: sufficiency(pools.b, 80) * acidMicro(drivers.ph) },
    { name: "molybdenum", value: sufficiency(pools.mo, 8) * moMicro(drivers.ph) },
  ];
  let microName = "micronutrients";
  let micro = 1;
  for (const m of micros) {
    const v = clamp(m.value, 0, 1);
    if (v < micro) {
      micro = v;
      microName = m.name;
    }
  }

  const caS = sufficiency(pools.ca, 600);
  const mgS = sufficiency(pools.mg, 80);
  const sS = sufficiency(pools.s, 12);
  const salt = drivers.ec <= crop.saltTol ? 1 : Math.exp(-0.45 * (drivers.ec - crop.saltTol));
  const pests = 1 - 0.72 * clamp(drivers.pests, 0, 1);

  const stresses: Stresses = {
    temperature: tResp,
    water: waterStress,
    nitrogen: nStress,
    phosphorus: pStress,
    potassium: kStress,
    ph: dPh,
    salinity: salt,
    micronutrient: micro,
    calcium: caS,
    magnesium: mgS,
    sulfur: sS,
    pests,
    microName,
  };

  const parts = [tResp, waterStress, nStress, pStress, kStress, dPh, salt, micro, caS, mgS, sS, pests];
  const worst = Math.min(...parts);
  const mean = parts.reduce((a, b) => a + b, 0) / parts.length;
  const gf = worst * (0.9 + 0.1 * mean);

  let growth = pot * gf * h;
  if (demandN > 0.02 && fixation > 0) {
    const share = fixation / (nFromSoil + fixation + 1e-9);
    growth *= 1 - 0.12 * share;
  }

  if (emerged && drivers.pests > 0) {
    shoot -= shoot * drivers.pests * 0.012 * h;
  }

  if (crop.perennial) {
    shoot += growth;
  } else if (development < crop.reproAt) {
    shoot += growth;
  } else {
    const intensity = clamp((development - crop.reproAt) / Math.max(0.2, 1 - crop.reproAt), 0, 1);
    const frac = 0.28 + 0.6 * intensity;
    let toEcon = growth * frac;
    const remob = Math.min(shoot * 0.45, shoot * (0.006 + 0.018 * intensity) * h);
    shoot = shoot + (growth - toEcon) - remob;
    econ = econ + toEcon + remob;
    if (shoot < 0.02 && emerged) shoot = 0.02;
    const total = shoot + econ;
    const cap = crop.hi * total;
    if (econ > cap) {
      shoot += econ - cap;
      econ = cap;
    }
  }

  if (!crop.perennial && development > 1.02) {
    const excess = development - 1.02;
    shoot *= Math.exp(-0.012 * excess * h * 8);
    econ *= Math.exp(-crop.shatter * excess * h * 6);
  }

  shoot = Math.max(0, shoot);
  econ = Math.max(0, econ);

  const actual = h > 0 ? growth / h : 0;
  const builtN = actual * crop.nConc * 10000 * h;
  const needP = actual * crop.pConc * 10000 * h;
  const needK = actual * crop.kConc * 10000 * h;
  const soilShare = nFromSoil + fixation > 0 ? nFromSoil / (nFromSoil + fixation) : 1;

  const nPool = pools.no3 + pools.nh4;
  let soilTaken = 0;
  const soilWant = builtN * soilShare;
  if (nPool > 0 && soilWant > 0) {
    const nTake = Math.min(soilWant, nPool);
    const no3Share = pools.no3 / nPool;
    const [no3, tookNo3] = take(pools.no3, nTake * no3Share);
    const [nh4, tookNh4] = take(pools.nh4, nTake - tookNo3);
    pools.no3 = no3;
    pools.nh4 = nh4;
    soilTaken = tookNo3 + tookNh4;
  }
  const fixedAmt = Math.min(fixation * h, Math.max(0, builtN - soilTaken));

  let tookP = 0;
  [pools.labileP, tookP] = take(pools.labileP, needP);
  let tookK = 0;
  [pools.exchK, tookK] = take(pools.exchK, needK);

  const dmHa = actual * h * 10000;
  const dropKg = (pool: number, gPerKg: number) => Math.max(0, pool - dmHa * (gPerKg / 1000));
  const dropG = (pool: number, gPerKg: number) => Math.max(0, pool - dmHa * gPerKg);
  pools.ca = dropKg(pools.ca, 4);
  pools.mg = dropKg(pools.mg, 2);
  pools.s = dropKg(pools.s, 2.5);
  pools.fe = dropG(pools.fe, 0.12);
  pools.mn = dropG(pools.mn, 0.04);
  pools.zn = dropG(pools.zn, 0.025);
  pools.cu = dropG(pools.cu, 0.006);
  pools.b = dropG(pools.b, 0.015);
  pools.mo = dropG(pools.mo, 0.0004);

  // Mineralization, transformations, losses — rates are per day.
  const omBoost = 1 + 0.12 * (drivers.om - 3);
  const minN = pools.orgN * 0.0075 * tQ * moistF * omBoost * h;
  pools.orgN -= minN;
  pools.nh4 += minN;
  const minInert = pools.inertN * 0.000018 * tQ * h;
  pools.inertN -= minInert;
  pools.nh4 += minInert;
  const minP = pools.orgP * 0.0032 * tQ * moistF * h;
  pools.orgP -= minP;
  pools.labileP += minP;
  const minK = pools.orgK * 0.004 * tQ * moistF * h;
  pools.orgK -= minK;
  pools.exchK += minK;
  const relK = pools.fixedK * 0.000035 * tQ * h;
  pools.fixedK -= relK;
  pools.exchK += relK;

  const nitFactor = temp > 2 && sat < 0.9 ? tQ * (drivers.ph > 5.2 ? 1 : 0.45) : temp > 2 ? tQ * 0.2 : 0;
  const nit = pools.nh4 * 0.2 * nitFactor * h;
  pools.nh4 -= nit;
  pools.no3 += nit;

  const vol = pools.nh4 * 0.018 * Math.max(0, drivers.ph - 7.25) * tQ * h;
  pools.nh4 -= vol;

  let den = 0;
  if (sat > 0.84) {
    const wet = clamp((sat - 0.84) / 0.16, 0, 1);
    const kDen = crop.waterlogOk ? 0.035 : 0.14;
    den = pools.no3 * kDen * wet * tQ * h;
    pools.no3 -= den;
  }

  const acidFix = drivers.ph < 5.8 ? (5.8 - drivers.ph) * 0.004 : 0;
  const alkFix = drivers.ph > 7.7 ? (drivers.ph - 7.7) * 0.003 : 0;
  const fixP = pools.labileP * (acidFix + alkFix) * h;
  pools.labileP -= fixP;
  pools.inertP += fixP;
  const rock = pools.inertP * 0.000025 * tQ * (drivers.ph < 6.2 ? 1.5 : 0.55) * h;
  pools.inertP -= rock;
  pools.labileP += rock;

  let drainage = 0;
  if (water > whc) {
    drainage = water - whc;
    water = whc;
  }
  if (water < 0) water = 0;
  let leachN = 0;
  let leachK = 0;
  if (drainage > 0) {
    const frac = drainage / (whc + drainage);
    leachN = pools.no3 * 0.62 * frac;
    pools.no3 -= leachN;
    leachK = pools.exchK * 0.08 * frac;
    pools.exchK -= leachK;
    pools.s = Math.max(0, pools.s - pools.s * 0.05 * frac);
  }

  for (const key of Object.keys(pools) as (keyof Pools)[]) {
    if (!Number.isFinite(pools[key]) || pools[key] < 0) pools[key] = 0;
  }

  const fluxes: Fluxes = {
    mineralizationN: (minN + minInert) / h,
    nitrification: nit / h,
    denitrification: den / h,
    volatilization: vol / h,
    leachingN: leachN / h,
    fixation: fixedAmt / h,
    uptakeN: soilTaken / h,
    uptakeP: tookP / h,
    uptakeK: tookK / h,
    mineralizationP: minP / h,
  };

  return {
    day: sim.day + h,
    development,
    shoot,
    econ,
    lai,
    rootFrac,
    water,
    pools,
    fluxes,
    stresses,
    limiter: limiterFrom(stresses),
    temperature: temp,
    rainToday: rain,
    parToday: par,
    doy,
    emerged,
    fixedN: sim.fixedN + fixedAmt,
    leachedN: sim.leachedN + leachN,
    denitrifiedN: sim.denitrifiedN + den,
    mineralizedN: sim.mineralizedN + minN + minInert,
  };
}

export interface RunResult {
  sim: SimState;
  history: HistPoint[];
}

export function histPoint(sim: SimState): HistPoint {
  return {
    day: Math.floor(sim.day),
    biomass: (sim.shoot + sim.econ) * 10,
    economic: sim.econ * 10,
  };
}

export function grow(
  sim: SimState,
  days: number,
  drivers: Drivers,
  crop: Crop,
  site: Site,
  history: HistPoint[],
): RunResult {
  let s = sim;
  let left = Math.max(0, days);
  let last = Math.floor(s.day);
  const next = history.slice();
  while (left > 1e-8) {
    const h = Math.min(0.5, left);
    s = step(s, h, drivers, crop, site);
    const f = Math.floor(s.day);
    if (f !== last && f > 0) {
      next.push(histPoint(s));
      if (next.length > 480) next.splice(0, next.length - 480);
      last = f;
    }
    left -= h;
  }
  return { sim: s, history: next };
}
