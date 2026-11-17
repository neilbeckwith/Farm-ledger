export type Texture = "sand" | "loam" | "silt" | "clay" | "peat";

export type Form =
  | "cereal"
  | "maize"
  | "legume"
  | "forage"
  | "brassica"
  | "sunflower"
  | "tuber"
  | "root"
  | "fiber";

export type RootShape = "none" | "tap" | "globe" | "tuber";

export type Head =
  | "spike"
  | "panicle"
  | "ear"
  | "pod"
  | "disc"
  | "boll"
  | "raceme"
  | "none";

export interface Pools {
  no3: number;
  nh4: number;
  orgN: number;
  inertN: number;
  labileP: number;
  orgP: number;
  inertP: number;
  exchK: number;
  orgK: number;
  fixedK: number;
  ca: number;
  mg: number;
  s: number;
  fe: number;
  mn: number;
  zn: number;
  cu: number;
  b: number;
  mo: number;
  cl: number;
}

export interface Drivers {
  plantDoy: number;
  density: number;
  vigor: number;
  pests: number;
  weeds: number;
  mycorrhizae: number;
  inoculation: number;
  tempAnomaly: number;
  rainMul: number;
  irrigation: number;
  radMul: number;
  texture: Texture;
  compaction: number;
  ph: number;
  ec: number;
  om: number;
  residue: number;
}

export interface Fluxes {
  mineralizationN: number;
  nitrification: number;
  denitrification: number;
  volatilization: number;
  leachingN: number;
  fixation: number;
  uptakeN: number;
  uptakeP: number;
  uptakeK: number;
  mineralizationP: number;
}

export interface Stresses {
  temperature: number;
  water: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  salinity: number;
  micronutrient: number;
  calcium: number;
  magnesium: number;
  sulfur: number;
  pests: number;
  microName: string;
}

export interface SimState {
  day: number;
  development: number;
  shoot: number;
  econ: number;
  lai: number;
  rootFrac: number;
  water: number;
  pools: Pools;
  fluxes: Fluxes;
  stresses: Stresses;
  limiter: string;
  temperature: number;
  rainToday: number;
  parToday: number;
  doy: number;
  emerged: boolean;
  fixedN: number;
  leachedN: number;
  denitrifiedN: number;
  mineralizedN: number;
}

export interface HistPoint {
  day: number;
  biomass: number;
  economic: number;
}

export interface Product {
  id: string;
  label: string;
  basis: "econ" | "shoot";
  fraction: number;
  /** Market mass = dry mass / dryMatter. 1 means already dry. */
  dryMatter: number;
  constituent: boolean;
}

export interface Stage {
  until: number;
  name: string;
}

export interface Crop {
  id: string;
  name: string;
  latin: string;
  blurb: string;
  form: Form;
  head: Head;
  rootShape: RootShape;
  daysToMaturity: number;
  tBase: number;
  tOpt: number;
  tMax: number;
  maxHeightCm: number;
  maxRootCm: number;
  rue: number;
  maxLai: number;
  sla: number;
  hi: number;
  reproAt: number;
  nConc: number;
  pConc: number;
  kConc: number;
  phOpt: [number, number];
  saltTol: number;
  optDensity: number;
  seedBiomass: number;
  /** Peak symbiotic or associative fixation, kg N/ha/day. */
  maxFix: number;
  fixHalfSat: number;
  shatter: number;
  perennial: boolean;
  maxShoot: number;
  waterlogOk: boolean;
  products: Product[];
  stages: Stage[];
}

export interface Site {
  id: string;
  name: string;
  region: string;
  note: string;
  tMean: number;
  tAmp: number;
  peakDoy: number;
  rainMean: number;
  rainAmp: number;
  rainPeak: number;
  parMean: number;
  parAmp: number;
  soil: Texture;
  ph: number;
  om: number;
  ec: number;
  pools: Pools;
}

export interface BankItem {
  key: string;
  crop: string;
  label: string;
  constituent: boolean;
  kg: number;
}

export interface LastHarvest {
  day: number;
  quality: number;
  headline: string;
}
