import { Bug, CloudRain, FlaskConical, Leaf, Sprout } from "lucide-react";
import type { ReactNode } from "react";
import { formatDoy, SITES, waterHolding } from "@/lib/acre/climate";
import { CROPS } from "@/lib/acre/crops";
import { DRESSINGS } from "@/lib/acre/dressings";
import { formatArea } from "@/lib/acre/format";
import { useAcre } from "@/lib/acre/store";
import type { Drivers, Pools, Texture } from "@/lib/acre/types";

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-fg">{label}</span>
        <span className="font-display text-gold tabular-nums">{display}</span>
      </span>
      <input
        className="acre-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        aria-label={label}
        suppressHydrationWarning
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Block({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3">
      <div>
        <h3 className="text-sm text-fg">{title}</h3>
        {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}

const TABS = [
  { id: "crop", label: "Crop", icon: Sprout },
  { id: "life", label: "Life", icon: Leaf },
  { id: "climate", label: "Climate", icon: CloudRain },
  { id: "soil", label: "Soil", icon: FlaskConical },
  { id: "pests", label: "Stress", icon: Bug },
] as const;

type TabId = (typeof TABS)[number]["id"];

export type { TabId };

const N_FIELDS: { key: keyof Pools; label: string; max: number; step: number }[] = [
  { key: "no3", label: "Nitrate NO₃⁻", max: 180, step: 1 },
  { key: "nh4", label: "Ammonium NH₄⁺", max: 120, step: 1 },
  { key: "orgN", label: "Organic, mineralizable", max: 400, step: 1 },
  { key: "inertN", label: "Inert humic N", max: 6000, step: 10 },
];
const P_FIELDS: { key: keyof Pools; label: string; max: number; step: number }[] = [
  { key: "labileP", label: "Labile phosphate", max: 100, step: 1 },
  { key: "orgP", label: "Organic P", max: 250, step: 1 },
  { key: "inertP", label: "Occluded / rock P", max: 2000, step: 5 },
];
const K_FIELDS: { key: keyof Pools; label: string; max: number; step: number }[] = [
  { key: "exchK", label: "Exchangeable K", max: 600, step: 1 },
  { key: "orgK", label: "Organic K", max: 200, step: 1 },
  { key: "fixedK", label: "Fixed clay K", max: 8000, step: 10 },
];
const MACRO_FIELDS: { key: keyof Pools; label: string; max: number; step: number }[] = [
  { key: "ca", label: "Calcium", max: 4000, step: 10 },
  { key: "mg", label: "Magnesium", max: 800, step: 1 },
  { key: "s", label: "Sulfur", max: 120, step: 1 },
];
const MICRO_FIELDS: { key: keyof Pools; label: string; max: number; step: number }[] = [
  { key: "fe", label: "Iron", max: 30000, step: 50 },
  { key: "mn", label: "Manganese", max: 8000, step: 10 },
  { key: "zn", label: "Zinc", max: 4000, step: 10 },
  { key: "cu", label: "Copper", max: 2000, step: 5 },
  { key: "b", label: "Boron", max: 1000, step: 5 },
  { key: "mo", label: "Molybdenum", max: 80, step: 1 },
  { key: "cl", label: "Chloride", max: 60000, step: 100 },
];

const TEXTURES: Texture[] = ["sand", "loam", "silt", "clay", "peat"];

function areaToSlider(m2: number): number {
  const t = (Math.log(Math.max(10, m2)) - Math.log(10)) / (Math.log(650000) - Math.log(10));
  return Math.round(Math.min(1, Math.max(0, t)) * 1000) / 1000;
}

function sliderToArea(t: number): number {
  const m2 = Math.exp(Math.log(10) + t * (Math.log(650000) - Math.log(10)));
  return Math.round(m2);
}

export function Controls({ tab, setTab }: { tab: TabId; setTab: (tab: TabId) => void }) {
  const cropId = useAcre((s) => s.cropId);
  const siteId = useAcre((s) => s.siteId);
  const areaM2 = useAcre((s) => s.areaM2);
  const drivers = useAcre((s) => s.drivers);
  const pools = useAcre((s) => s.pools);
  const setCrop = useAcre((s) => s.setCrop);
  const setSite = useAcre((s) => s.setSite);
  const loadTypicalSoil = useAcre((s) => s.loadTypicalSoil);
  const setArea = useAcre((s) => s.setArea);
  const setDriver = useAcre((s) => s.setDriver);
  const setPool = useAcre((s) => s.setPool);
  const dress = useAcre((s) => s.dress);
  const crop = CROPS.find((item) => item.id === cropId) ?? CROPS[0]!;

  const driverNum = (key: keyof Drivers, value: number) => setDriver(key, value);

  return (
    <section className="rounded-lg border border-line bg-surface">
      <div className="flex gap-1 overflow-x-auto border-b border-line p-2" role="tablist">
        {TABS.map((item) => {
          const Icon = item.icon;
          const on = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(item.id)}
              className={
                "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-sm transition-transform duration-150 ease-out active:scale-[0.96] " +
                (on ? "bg-leaf text-bg" : "text-muted")
              }
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 p-4">
        {tab === "crop" && (
          <>
            <Block title="Species" hint="Choosing another crop resows into the same soil.">
              <div className="min-w-0 overflow-x-auto">
                <div className="flex w-max gap-2 pb-1">
                {CROPS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCrop(item.id)}
                    aria-pressed={item.id === cropId}
                    className={
                      "h-14 min-w-28 shrink-0 rounded-md border px-3 text-left transition-transform duration-150 ease-out active:scale-[0.96] " +
                      (item.id === cropId ? "border-leaf bg-raised text-fg" : "border-line text-muted")
                    }
                  >
                    <span className="block text-sm text-fg">{item.name}</span>
                    <span className="block text-xs">{item.daysToMaturity} d{item.maxFix > 1 ? " · N₂" : ""}</span>
                  </button>
                ))}
                </div>
              </div>
              <p className="text-sm text-muted">
                <span className="text-fg italic">{crop.latin}.</span> {crop.blurb}
              </p>
            </Block>
            <Block title="Ground" hint="The site sets the weather. Typical soil is optional.">
              <div className="grid gap-2 sm:grid-cols-2">
                {SITES.map((site) => (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => setSite(site.id)}
                    aria-pressed={site.id === siteId}
                    className={
                      "rounded-md border px-3 py-2 text-left transition-transform duration-150 ease-out active:scale-[0.96] " +
                      (site.id === siteId ? "border-leaf bg-raised" : "border-line")
                    }
                  >
                    <span className="block text-sm text-fg">{site.name}</span>
                    <span className="block text-xs text-muted">{site.region}. {site.note}</span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={loadTypicalSoil} className="h-11 text-left text-sm text-gold">
                Load this ground’s typical nutrient bank
              </button>
            </Block>
            <SliderField
              label="Sowing date"
              min={1}
              max={365}
              step={1}
              value={drivers.plantDoy}
              display={formatDoy(drivers.plantDoy)}
              onChange={(value) => driverNum("plantDoy", value)}
            />
            <SliderField
              label="Area"
              min={0}
              max={1}
              step={0.001}
              value={areaToSlider(areaM2)}
              display={formatArea(areaM2)}
              onChange={(value) => setArea(sliderToArea(value))}
            />
            <div className="flex flex-wrap gap-2">
              {[
                ["Bed", 20],
                ["Plot", 1000],
                ["Hectare", 10000],
                ["Field", 100000],
                ["65 ha", 650000],
              ].map(([label, m2]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setArea(Number(m2))}
                  className="h-10 rounded-md border border-line px-3 text-sm text-muted"
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {tab === "life" && (
          <>
            <Block
              title="Stand"
              hint="Density peaks at the crop’s optimum and falls off if you crowd it or sow thin."
            >
              <SliderField
                label="Density"
                min={0}
                max={Math.max(2, crop.optDensity * 2.5)}
                step={crop.optDensity > 40 ? 1 : 0.1}
                value={drivers.density}
                display={`${drivers.density.toFixed(crop.optDensity > 40 ? 0 : 1)} /m²`}
                onChange={(value) => driverNum("density", value)}
              />
              <SliderField
                label="Cultivar vigor"
                min={0.5}
                max={1.35}
                step={0.01}
                value={drivers.vigor}
                display={`${Math.round(drivers.vigor * 100)}%`}
                onChange={(value) => driverNum("vigor", value)}
              />
            </Block>
            <Block
              title="Diazotrophy"
              hint="Soy, pea and alfalfa fix meaningful N₂. Cereals only leak a little through free-living bacteria. High mineral N suppresses nodules. Molybdenum and a near-neutral pH let them work."
            >
              <SliderField
                label="Inoculation"
                min={0}
                max={1}
                step={0.01}
                value={drivers.inoculation}
                display={`${Math.round(drivers.inoculation * 100)}%`}
                onChange={(value) => driverNum("inoculation", value)}
              />
              <SliderField
                label="Mycorrhizae"
                min={0}
                max={1}
                step={0.01}
                value={drivers.mycorrhizae}
                display={`${Math.round(drivers.mycorrhizae * 100)}%`}
                onChange={(value) => driverNum("mycorrhizae", value)}
              />
            </Block>
            <Block title="Residue" hint="Returned straw feeds organic N, P and K. Taken straw goes to the barn.">
              <SliderField
                label="Residue returned"
                min={0}
                max={1}
                step={0.01}
                value={drivers.residue}
                display={`${Math.round(drivers.residue * 100)}%`}
                onChange={(value) => driverNum("residue", value)}
              />
            </Block>
          </>
        )}

        {tab === "climate" && (
          <>
            <Block title="Weather on this ground" hint="Anomaly and multipliers sit on top of the site’s seasonal curve.">
              <SliderField
                label="Temperature anomaly"
                min={-10}
                max={10}
                step={0.1}
                value={drivers.tempAnomaly}
                display={`${drivers.tempAnomaly.toFixed(1)} °C`}
                onChange={(value) => driverNum("tempAnomaly", value)}
              />
              <SliderField
                label="Rainfall"
                min={0}
                max={2.5}
                step={0.05}
                value={drivers.rainMul}
                display={`${drivers.rainMul.toFixed(2)}×`}
                onChange={(value) => driverNum("rainMul", value)}
              />
              <SliderField
                label="Irrigation"
                min={0}
                max={15}
                step={0.1}
                value={drivers.irrigation}
                display={`${drivers.irrigation.toFixed(1)} mm/d`}
                onChange={(value) => driverNum("irrigation", value)}
              />
              <SliderField
                label="Radiation"
                min={0.35}
                max={1.35}
                step={0.01}
                value={drivers.radMul}
                display={`${Math.round(drivers.radMul * 100)}%`}
                onChange={(value) => driverNum("radMul", value)}
              />
            </Block>
          </>
        )}

        {tab === "pests" && (
          <Block title="Biotic and physical drag" hint="Pests eat leaf. Weeds steal light and nitrogen. Compaction shortens roots.">
            <SliderField
              label="Pest pressure"
              min={0}
              max={1}
              step={0.01}
              value={drivers.pests}
              display={`${Math.round(drivers.pests * 100)}%`}
              onChange={(value) => driverNum("pests", value)}
            />
            <SliderField
              label="Weed pressure"
              min={0}
              max={1}
              step={0.01}
              value={drivers.weeds}
              display={`${Math.round(drivers.weeds * 100)}%`}
              onChange={(value) => driverNum("weeds", value)}
            />
            <SliderField
              label="Compaction"
              min={0}
              max={0.75}
              step={0.01}
              value={drivers.compaction}
              display={`${Math.round(drivers.compaction * 100)}%`}
              onChange={(value) => driverNum("compaction", value)}
            />
          </Block>
        )}

        {tab === "soil" && (
          <>
            <Block title="Dress the stand" hint="These hit the live pools now. Urea lands as ammonium. Rock phosphate lands as inert P.">
              <div className="flex flex-wrap gap-2">
                {DRESSINGS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => dress(item.id)}
                    className="h-12 rounded-md border border-line px-3 text-left transition-transform duration-150 ease-out active:scale-[0.96]"
                    title={item.detail}
                  >
                    <span className="block text-sm text-fg">{item.name}</span>
                    <span className="block text-xs text-muted">{item.rate}</span>
                  </button>
                ))}
              </div>
            </Block>
            <Block title="Reaction and holding" hint={`Water holding about ${Math.round(waterHolding(drivers.texture, drivers.compaction, drivers.om))} mm.`}>
              <div className="flex flex-wrap gap-2">
                {TEXTURES.map((texture) => (
                  <button
                    key={texture}
                    type="button"
                    onClick={() => setDriver("texture", texture)}
                    aria-pressed={drivers.texture === texture}
                    className={
                      "h-10 rounded-md border px-3 text-sm capitalize " +
                      (drivers.texture === texture ? "border-leaf text-fg" : "border-line text-muted")
                    }
                  >
                    {texture}
                  </button>
                ))}
              </div>
              <SliderField
                label="pH"
                min={4.2}
                max={8.6}
                step={0.05}
                value={drivers.ph}
                display={drivers.ph.toFixed(2)}
                onChange={(value) => driverNum("ph", value)}
              />
              <SliderField
                label="Salinity"
                min={0}
                max={8}
                step={0.05}
                value={drivers.ec}
                display={`${drivers.ec.toFixed(2)} dS/m`}
                onChange={(value) => driverNum("ec", value)}
              />
              <SliderField
                label="Organic matter"
                min={0.4}
                max={8}
                step={0.1}
                value={drivers.om}
                display={`${drivers.om.toFixed(1)}%`}
                onChange={(value) => driverNum("om", value)}
              />
            </Block>
            <PoolGroup title="Nitrogen speciation" hint="Nitrate leaches. Ammonium volatilizes when alkaline. Organic mineralizes. Humic N barely moves this season." fields={N_FIELDS} pools={pools} setPool={setPool} unit="kg/ha" />
            <PoolGroup title="Phosphorus speciation" hint="Plants take labile Pi. Low or high pH locks it into the occluded pool. Mycorrhizae help the labile fraction." fields={P_FIELDS} pools={pools} setPool={setPool} unit="kg/ha" />
            <PoolGroup title="Potassium speciation" hint="Exchangeable K is what roots see. Fixed K in clay trickles out." fields={K_FIELDS} pools={pools} setPool={setPool} unit="kg/ha" />
            <PoolGroup title="Secondary macros" hint="Kilograms per hectare of available nutrient." fields={MACRO_FIELDS} pools={pools} setPool={setPool} unit="kg/ha" />
            <PoolGroup title="Micronutrients" hint="Grams per hectare. Molybdenum gates nitrogenase. Iron, zinc and manganese fade as pH rises." fields={MICRO_FIELDS} pools={pools} setPool={setPool} unit="g/ha" />
          </>
        )}
      </div>
    </section>
  );
}

function PoolGroup({
  title,
  hint,
  fields,
  pools,
  setPool,
  unit,
}: {
  title: string;
  hint: string;
  fields: { key: keyof Pools; label: string; max: number; step: number }[];
  pools: Pools;
  setPool: (key: keyof Pools, value: number) => void;
  unit: string;
}) {
  return (
    <Block title={title} hint={hint}>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <SliderField
            key={field.key}
            label={field.label}
            min={0}
            max={field.max}
            step={field.step}
            value={pools[field.key]}
            display={`${Math.round(pools[field.key])} ${unit}`}
            onChange={(value) => setPool(field.key, value)}
          />
        ))}
      </div>
    </Block>
  );
}
