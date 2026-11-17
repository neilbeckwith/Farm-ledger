import { create } from "zustand";
import { driversForSite, getSite } from "@/lib/acre/climate";
import { getCrop } from "@/lib/acre/crops";
import { applyDressing } from "@/lib/acre/dressings";
import { formatMass } from "@/lib/acre/format";
import { clonePools } from "@/lib/acre/pools";
import { freshSim, grow, qualityOf } from "@/lib/acre/step";
import type {
  BankItem,
  Drivers,
  HistPoint,
  LastHarvest,
  Pools,
  SimState,
  Texture,
} from "@/lib/acre/types";

export const SPEEDS = [1, 5, 15, 40, 120] as const;

const STRAWISH = new Set(["straw", "stover", "haulm", "stalk", "tops"]);

export const DEFAULT_DRIVERS: Drivers = {
  plantDoy: 128,
  density: 250,
  vigor: 1,
  pests: 0.04,
  weeds: 0.08,
  mycorrhizae: 0.55,
  inoculation: 0.8,
  tempAnomaly: 0,
  rainMul: 1,
  irrigation: 0,
  radMul: 1,
  texture: "loam",
  compaction: 0.08,
  ph: 6.6,
  ec: 0.4,
  om: 3.2,
  residue: 0.35,
};

const OPEN_DAYS = 58;

export interface AcreStore extends SimState {
  cropId: string;
  siteId: string;
  areaM2: number;
  drivers: Drivers;
  history: HistPoint[];
  quality: number;
  peakQuality: number;
  stubble: boolean;
  running: boolean;
  speed: number;
  bank: BankItem[];
  cuts: number;
  lastHarvest: LastHarvest | null;
  note: string;
  advance: (days: number) => void;
  toggleRun: () => void;
  setSpeed: (speed: number) => void;
  setCrop: (id: string) => void;
  setSite: (id: string) => void;
  loadTypicalSoil: () => void;
  setArea: (m2: number) => void;
  setDriver: <K extends keyof Drivers>(key: K, value: Drivers[K]) => void;
  setPool: <K extends keyof Pools>(key: K, value: number) => void;
  dress: (id: string) => void;
  harvest: () => void;
  replant: (fresh: boolean) => void;
  reset: () => void;
  clearBank: () => void;
  hydrate: (data: Persisted) => void;
}

export interface Persisted {
  v: 1;
  cropId: string;
  siteId: string;
  areaM2: number;
  drivers: Drivers;
  sim: SimState;
  history: HistPoint[];
  quality: number;
  peakQuality: number;
  stubble: boolean;
  running: boolean;
  speed: number;
  bank: BankItem[];
  cuts: number;
  lastHarvest: LastHarvest | null;
}

function toSim(s: SimState): SimState {
  return {
    day: s.day,
    development: s.development,
    shoot: s.shoot,
    econ: s.econ,
    lai: s.lai,
    rootFrac: s.rootFrac,
    water: s.water,
    pools: s.pools,
    fluxes: s.fluxes,
    stresses: s.stresses,
    limiter: s.limiter,
    temperature: s.temperature,
    rainToday: s.rainToday,
    parToday: s.parToday,
    doy: s.doy,
    emerged: s.emerged,
    fixedN: s.fixedN,
    leachedN: s.leachedN,
    denitrifiedN: s.denitrifiedN,
    mineralizedN: s.mineralizedN,
  };
}

function returnResidue(pools: Pools, shoot: number, nConc: number, pConc: number, kConc: number, frac: number): Pools {
  const next = clonePools(pools);
  next.orgN += shoot * nConc * 0.55 * frac * 10000;
  next.orgP += shoot * pConc * 0.6 * frac * 10000;
  next.orgK += shoot * kConc * 0.75 * frac * 10000;
  return next;
}

function mergeBank(bank: BankItem[], add: BankItem[]): BankItem[] {
  const map = new Map(bank.map((item) => [item.key, { ...item }]));
  for (const item of add) {
    const prev = map.get(item.key);
    if (prev) prev.kg += item.kg;
    else map.set(item.key, { ...item });
  }
  return [...map.values()];
}

function resown(cropId: string, drivers: Drivers, pools: Pools, siteId: string, areaM2: number, bank: BankItem[], note: string) {
  const crop = getCrop(cropId);
  const site = getSite(siteId);
  const sim = freshSim(drivers, pools, site);
  return {
    ...sim,
    cropId,
    siteId,
    areaM2,
    drivers,
    history: [] as HistPoint[],
    quality: 0,
    peakQuality: 0,
    stubble: false,
    running: true,
    bank,
    cuts: 0,
    note,
  };
}

function opening(): Omit<
  AcreStore,
  | "advance"
  | "toggleRun"
  | "setSpeed"
  | "setCrop"
  | "setSite"
  | "loadTypicalSoil"
  | "setArea"
  | "setDriver"
  | "setPool"
  | "dress"
  | "harvest"
  | "replant"
  | "reset"
  | "clearBank"
  | "hydrate"
> {
  const crop = getCrop("wheat");
  const site = getSite("ottawa");
  const drivers = { ...DEFAULT_DRIVERS, density: crop.optDensity };
  const sim0 = freshSim(drivers, clonePools(site.pools), site);
  const ran = grow(sim0, OPEN_DAYS, drivers, crop, site, []);
  const quality = qualityOf(crop, ran.sim.development, ran.sim.shoot, ran.sim.econ);
  return {
    cropId: crop.id,
    siteId: site.id,
    areaM2: 10000,
    drivers,
    ...ran.sim,
    history: ran.history,
    quality,
    peakQuality: quality,
    stubble: false,
    running: true,
    speed: 15,
    bank: [],
    cuts: 0,
    lastHarvest: null,
    note: "A stand is already in the ground. Time runs until you pause it.",
  };
}

export function snapshot(s: AcreStore): Persisted {
  return {
    v: 1,
    cropId: s.cropId,
    siteId: s.siteId,
    areaM2: s.areaM2,
    drivers: s.drivers,
    sim: toSim(s),
    history: s.history,
    quality: s.quality,
    peakQuality: s.peakQuality,
    stubble: s.stubble,
    running: s.running,
    speed: s.speed,
    bank: s.bank,
    cuts: s.cuts,
    lastHarvest: s.lastHarvest,
  };
}

export const useAcre = create<AcreStore>((set) => ({
  ...opening(),
  advance: (days) => {
    if (days <= 0) return;
    set((s) => {
      if (s.stubble) return s;
      const crop = getCrop(s.cropId);
      const site = getSite(s.siteId);
      const ran = grow(toSim(s), days, s.drivers, crop, site, s.history);
      const quality = qualityOf(crop, ran.sim.development, ran.sim.shoot, ran.sim.econ);
      return {
        ...ran.sim,
        history: ran.history,
        quality,
        peakQuality: Math.max(s.peakQuality, quality),
      };
    });
  },
  toggleRun: () => set((s) => ({ running: s.stubble ? false : !s.running })),
  setSpeed: (speed) => set((s) => ({ speed, running: s.stubble ? false : speed > 0 })),
  setCrop: (id) =>
    set((s) => {
      if (s.cropId === id) return s;
      const crop = getCrop(id);
      const drivers = { ...s.drivers, density: crop.optDensity };
      return resown(id, drivers, s.pools, s.siteId, s.areaM2, s.bank, `${crop.name} sown into the soil you left.`);
    }),
  setSite: (id) =>
    set((s) => {
      if (s.siteId === id) return s;
      const site = getSite(id);
      const crop = getCrop(s.cropId);
      return {
        siteId: id,
        drivers: driversForSite(site, s.drivers, s.drivers.density || crop.optDensity),
        note: `${site.name}. Weather, pH and texture changed. The nutrient bank stayed.`,
      };
    }),
  loadTypicalSoil: () =>
    set((s) => {
      const site = getSite(s.siteId);
      return {
        pools: clonePools(site.pools),
        drivers: driversForSite(site, s.drivers, s.drivers.density),
        note: `Soil bank replaced with a typical ${site.name} profile.`,
      };
    }),
  setArea: (areaM2) => set({ areaM2 }),
  setDriver: (key, value) =>
    set((s) => ({
      drivers: { ...s.drivers, [key]: value },
    })),
  setPool: (key, value) =>
    set((s) => ({
      pools: { ...s.pools, [key]: Math.max(0, value) },
    })),
  dress: (id) =>
    set((s) => {
      const next = applyDressing(id, s.pools, s.drivers);
      return { pools: next.pools, drivers: next.drivers, note: "Dressing mixed into the live soil." };
    }),
  harvest: () =>
    set((s) => {
      const crop = getCrop(s.cropId);
      const quality = qualityOf(crop, s.development, s.shoot, s.econ);
      if (quality < 0.08) return s;
      if (crop.perennial && s.shoot < 0.08) return s;
      if (!crop.perennial && s.econ < 0.012 && s.development < 0.8) return s;

      const additions: BankItem[] = [];
      let headline = "";
      for (const product of crop.products) {
        let basis = product.basis === "econ" ? s.econ : s.shoot;
        if (STRAWISH.has(product.id)) basis *= 1 - s.drivers.residue;
        const kg = (basis * product.fraction * quality * s.areaM2) / product.dryMatter;
        if (kg < 0.05) continue;
        additions.push({
          key: `${crop.id}:${product.id}`,
          crop: crop.name,
          label: product.label,
          constituent: product.constituent,
          kg,
        });
        if (!headline && !product.constituent) headline = `${formatMass(kg)} ${product.label.toLowerCase()}`;
      }
      const frac = crop.perennial ? 0.08 : 0.12 + 0.75 * s.drivers.residue;
      const pools = returnResidue(s.pools, s.shoot, crop.nConc, crop.pConc, crop.kConc, frac);
      const bank = mergeBank(s.bank, additions);
      const lastHarvest = {
        day: Math.floor(s.day),
        quality,
        headline: headline || "a harvest",
      };
      if (crop.perennial) {
        return {
          bank,
          pools,
          shoot: crop.seedBiomass,
          econ: 0,
          development: 0.12,
          emerged: true,
          lai: 0.2,
          quality: 0,
          peakQuality: 0,
          cuts: s.cuts + 1,
          lastHarvest,
          note: "Cut taken. The crown and nodules stayed in the ground.",
        };
      }
      return {
        bank,
        pools,
        stubble: true,
        running: false,
        shoot: Math.min(0.045, s.shoot),
        econ: 0,
        quality,
        lastHarvest,
        note: "In the barn. What you returned as residue is back in the organic pools.",
      };
    }),
  replant: (fresh) =>
    set((s) => {
      const site = getSite(s.siteId);
      const crop = getCrop(s.cropId);
      const drivers = fresh
        ? driversForSite(site, { ...DEFAULT_DRIVERS, plantDoy: s.drivers.plantDoy, density: crop.optDensity }, crop.optDensity)
        : s.drivers;
      const pools = fresh ? clonePools(site.pools) : s.pools;
      return {
        ...resown(s.cropId, drivers, pools, s.siteId, s.areaM2, s.bank, fresh ? "Fresh soil for this ground." : "Resown into the soil you left."),
        speed: s.speed || 15,
        running: true,
        lastHarvest: s.lastHarvest,
      };
    }),
  reset: () =>
    set((s) => {
      const next = {
        ...opening(),
        note: "Reset. Ottawa wheat on one hectare, typical soil, empty barn.",
      };
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("acre-ledger-v1", JSON.stringify(snapshot({ ...s, ...next })));
        }
      } catch {
        /* storage blocked */
      }
      return next;
    }),
  clearBank: () => set({ bank: [], note: "Barn ledger cleared." }),
  hydrate: (data) =>
    set((s) => {
      if (!data || data.v !== 1 || !data.sim?.pools || !data.drivers) return s;
      const crop = getCrop(data.cropId);
      const site = getSite(data.siteId);
      if (!Number.isFinite(data.sim.day)) return s;
      return {
        ...data.sim,
        cropId: crop.id,
        siteId: site.id,
        areaM2: Number.isFinite(data.areaM2) ? data.areaM2 : s.areaM2,
        drivers: { ...DEFAULT_DRIVERS, ...data.drivers },
        history: Array.isArray(data.history) ? data.history.slice(-480) : [],
        quality: data.quality ?? 0,
        peakQuality: data.peakQuality ?? 0,
        stubble: Boolean(data.stubble),
        running: Boolean(data.running) && !data.stubble,
        speed: data.speed || 15,
        bank: Array.isArray(data.bank) ? data.bank : [],
        cuts: data.cuts ?? 0,
        lastHarvest: data.lastHarvest ?? null,
        note: "",
      };
    }),
}));

export function isTexture(value: string): value is Texture {
  return value === "sand" || value === "loam" || value === "silt" || value === "clay" || value === "peat";
}
