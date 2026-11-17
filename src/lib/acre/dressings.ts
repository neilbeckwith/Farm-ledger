import { clamp } from "@/lib/acre/math";
import { clonePools } from "@/lib/acre/pools";
import type { Drivers, Pools } from "@/lib/acre/types";

export interface Dressing {
  id: string;
  name: string;
  rate: string;
  detail: string;
}

export const DRESSINGS: Dressing[] = [
  { id: "urea", name: "Urea", rate: "40 kg N", detail: "Amide, hydrolyzes into NH₄⁺" },
  { id: "an", name: "Ammonium nitrate", rate: "30 kg N", detail: "Half NH₄⁺, half NO₃⁻" },
  { id: "cn", name: "Calcium nitrate", rate: "25 kg N", detail: "NO₃⁻ plus calcium" },
  { id: "compost", name: "Compost", rate: "3 t", detail: "Organic N, P and K" },
  { id: "map", name: "MAP", rate: "15 kg P", detail: "Labile phosphate plus NH₄⁺" },
  { id: "rock", name: "Rock phosphate", rate: "30 kg P", detail: "Inert P, very slow release" },
  { id: "mop", name: "Muriate of potash", rate: "40 kg K", detail: "Exchangeable K plus chloride" },
  { id: "gypsum", name: "Gypsum", rate: "200 kg", detail: "Calcium and sulfate" },
  { id: "micros", name: "Micro mix", rate: "one pass", detail: "Zn, Cu, B, Mo, Fe, Mn" },
  { id: "lime", name: "Lime", rate: "+0.3 pH", detail: "Calcium carbonate" },
  { id: "sulfur", name: "Sulfur", rate: "20 kg S", detail: "Sulfate, nudges pH down" },
  { id: "rhizobia", name: "Rhizobia", rate: "inoculate", detail: "Sets diazotroph inoculation to full" },
  { id: "myco", name: "Mycorrhizae", rate: "inoculate", detail: "Better labile-P uptake" },
];

export function applyDressing(
  id: string,
  pools: Pools,
  drivers: Drivers,
): { pools: Pools; drivers: Drivers } {
  const p = clonePools(pools);
  const d = { ...drivers };
  switch (id) {
    case "urea":
      p.nh4 += d.ph > 7.4 ? 36 : 39.2;
      break;
    case "an":
      p.nh4 += 15;
      p.no3 += 15;
      break;
    case "cn":
      p.no3 += 25;
      p.ca += 18;
      break;
    case "compost":
      p.orgN += 18;
      p.orgP += 6;
      p.orgK += 16;
      d.om = clamp(d.om + 0.15, 0.4, 12);
      break;
    case "map":
      p.labileP += 15;
      p.nh4 += 8;
      break;
    case "rock":
      p.inertP += 30;
      break;
    case "mop":
      p.exchK += 40;
      p.cl += 8000;
      break;
    case "gypsum":
      p.ca += 46;
      p.s += 36;
      break;
    case "micros":
      p.zn += 400;
      p.cu += 150;
      p.b += 80;
      p.mo += 12;
      p.fe += 500;
      p.mn += 400;
      break;
    case "lime":
      d.ph = clamp(d.ph + 0.3, 4, 8.4);
      p.ca += 400;
      break;
    case "sulfur":
      p.s += 20;
      d.ph = clamp(d.ph - 0.15, 4, 8.4);
      break;
    case "rhizobia":
      d.inoculation = 1;
      break;
    case "myco":
      d.mycorrhizae = clamp(d.mycorrhizae + 0.45, 0, 1);
      break;
    default:
      break;
  }
  return { pools: p, drivers: d };
}
