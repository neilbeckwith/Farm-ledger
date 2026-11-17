import { clamp } from "@/lib/acre/math";
import { clonePools, DEFAULT_POOLS } from "@/lib/acre/pools";
import type { Drivers, Pools, Site, Texture } from "@/lib/acre/types";

function pools(patch: Partial<Pools>): Pools {
  return { ...clonePools(DEFAULT_POOLS), ...patch };
}

export const SITES: Site[] = [
  {
    id: "ottawa",
    name: "Ottawa Valley",
    region: "Ontario",
    note: "Continental. Cold winter, mild summer, reliable rain.",
    tMean: 6.4,
    tAmp: 16.2,
    peakDoy: 200,
    rainMean: 2.45,
    rainAmp: 0.55,
    rainPeak: 180,
    parMean: 12.2,
    parAmp: 6,
    soil: "loam",
    ph: 6.6,
    om: 3.2,
    ec: 0.4,
    pools: pools({}),
  },
  {
    id: "peterborough",
    name: "Peterborough",
    region: "Ontario",
    note: "Mixed-farm country. Similar season to the valley, slightly drier.",
    tMean: 6.8,
    tAmp: 15.4,
    peakDoy: 201,
    rainMean: 2.2,
    rainAmp: 0.45,
    rainPeak: 175,
    parMean: 12.4,
    parAmp: 6,
    soil: "loam",
    ph: 6.5,
    om: 3.0,
    ec: 0.35,
    pools: pools({ orgN: 120, labileP: 24 }),
  },
  {
    id: "okanagan",
    name: "Okanagan bench",
    region: "British Columbia",
    note: "Semi-arid. Irrigation decides the crop.",
    tMean: 9.2,
    tAmp: 13.5,
    peakDoy: 198,
    rainMean: 0.75,
    rainAmp: -0.35,
    rainPeak: 200,
    parMean: 15.5,
    parAmp: 7,
    soil: "silt",
    ph: 7.3,
    om: 1.6,
    ec: 0.9,
    pools: pools({ orgN: 45, inertN: 1400, labileP: 18, exchK: 180 }),
  },
  {
    id: "prairie",
    name: "Black prairie",
    region: "Saskatchewan",
    note: "High organic matter, a short warm window, a dry summer.",
    tMean: 2.4,
    tAmp: 18.5,
    peakDoy: 198,
    rainMean: 1.15,
    rainAmp: 0.7,
    rainPeak: 170,
    parMean: 13,
    parAmp: 7,
    soil: "loam",
    ph: 6.8,
    om: 5.6,
    ec: 0.5,
    pools: pools({ orgN: 190, inertN: 4600, exchK: 320, labileP: 22 }),
  },
  {
    id: "maritime",
    name: "Cool maritime",
    region: "Northwest Europe",
    note: "Mild, wet, dimmer light. Cereals and forage do the work.",
    tMean: 10.2,
    tAmp: 6.5,
    peakDoy: 202,
    rainMean: 2.9,
    rainAmp: 0.3,
    rainPeak: 20,
    parMean: 9.4,
    parAmp: 5,
    soil: "loam",
    ph: 6.2,
    om: 4.1,
    ec: 0.3,
    pools: pools({ orgN: 150, labileP: 20 }),
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    region: "Winter-rain coast",
    note: "Rain in winter, drought by early summer. Sow with the wet season.",
    tMean: 16.2,
    tAmp: 8,
    peakDoy: 200,
    rainMean: 1.35,
    rainAmp: 1.15,
    rainPeak: 20,
    parMean: 16.5,
    parAmp: 6,
    soil: "clay",
    ph: 7.6,
    om: 1.5,
    ec: 1.1,
    pools: pools({ orgN: 55, labileP: 16, ca: 2800, exchK: 200 }),
  },
  {
    id: "subtropic",
    name: "Humid subtropics",
    region: "Southeast",
    note: "Hot, wet, weathered soils. Phosphorus ties up if the pH is low.",
    tMean: 18.4,
    tAmp: 8.5,
    peakDoy: 200,
    rainMean: 3.5,
    rainAmp: 1.2,
    rainPeak: 200,
    parMean: 15.2,
    parAmp: 4,
    soil: "silt",
    ph: 5.5,
    om: 2.1,
    ec: 0.3,
    pools: pools({ labileP: 14, inertP: 900, fe: 18000, exchK: 140 }),
  },
  {
    id: "monsoon",
    name: "Tropical monsoon",
    region: "Low latitudes",
    note: "Heat all year. A wet pulse, then leaching of nitrate and potassium.",
    tMean: 26.5,
    tAmp: 2.4,
    peakDoy: 180,
    rainMean: 4.8,
    rainAmp: 3.2,
    rainPeak: 210,
    parMean: 17,
    parAmp: 2,
    soil: "clay",
    ph: 5.3,
    om: 1.3,
    ec: 0.35,
    pools: pools({ no3: 10, orgN: 70, labileP: 10, exchK: 90, fe: 20000, ca: 800 }),
  },
  {
    id: "pampas",
    name: "Humid pampas",
    region: "Argentina",
    note: "Southern hemisphere. January is midsummer.",
    tMean: 16.4,
    tAmp: 7,
    peakDoy: 15,
    rainMean: 2.6,
    rainAmp: 0.5,
    rainPeak: 40,
    parMean: 15,
    parAmp: 5,
    soil: "loam",
    ph: 6.3,
    om: 3.8,
    ec: 0.4,
    pools: pools({ orgN: 150, labileP: 26, exchK: 260 }),
  },
  {
    id: "nile",
    name: "Irrigated floodplain",
    region: "Arid delta",
    note: "Almost no rain. Alkaline, slightly saline, bright.",
    tMean: 22,
    tAmp: 8,
    peakDoy: 200,
    rainMean: 0.12,
    rainAmp: 0.05,
    rainPeak: 20,
    parMean: 19.5,
    parAmp: 4,
    soil: "clay",
    ph: 7.9,
    om: 1.1,
    ec: 1.9,
    pools: pools({ orgN: 40, labileP: 18, ca: 3200, exchK: 280, fe: 6000, zn: 700 }),
  },
];

const siteById = Object.fromEntries(SITES.map((s) => [s.id, s]));

export function getSite(id: string): Site {
  return siteById[id] ?? SITES[0]!;
}

export function temperature(site: Site, doy: number, anomaly: number): number {
  const rad = (2 * Math.PI * (doy - site.peakDoy)) / 365;
  return site.tMean + site.tAmp * Math.cos(rad) + anomaly;
}

export function rainfall(site: Site, doy: number, mul: number): number {
  const rad = (2 * Math.PI * (doy - site.rainPeak)) / 365;
  return Math.max(0, (site.rainMean + site.rainAmp * Math.cos(rad)) * mul);
}

export function daylightPar(site: Site, doy: number, mul: number, rainMm: number): number {
  const rad = (2 * Math.PI * (doy - site.peakDoy)) / 365;
  const clear = site.parMean + site.parAmp * Math.cos(rad);
  const cloud = 1 - 0.38 * clamp(rainMm / 8, 0, 1);
  return Math.max(1.5, clear * cloud * mul);
}

export function calendarDoy(plantDoy: number, day: number): number {
  const d = Math.floor(plantDoy - 1 + day) % 365;
  return d < 0 ? d + 365 + 1 : d + 1;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function formatDoy(doy: number): string {
  let d = Math.round(doy);
  if (d < 1) d = 1;
  for (let i = 0; i < 12; i++) {
    const dim = DOM[i] ?? 30;
    if (d <= dim) return `${d} ${MONTHS[i]}`;
    d -= dim;
  }
  return "31 Dec";
}

const WHC: Record<Texture, number> = {
  sand: 90,
  loam: 165,
  silt: 190,
  clay: 205,
  peat: 250,
};

export function waterHolding(texture: Texture, compaction: number, om: number): number {
  const base = WHC[texture];
  return base * (1 - 0.28 * clamp(compaction, 0, 0.9)) * (1 + 0.04 * (om - 3));
}

export function driversForSite(site: Site, prev: Drivers, density: number): Drivers {
  return {
    ...prev,
    density,
    texture: site.soil,
    ph: site.ph,
    om: site.om,
    ec: site.ec,
  };
}
