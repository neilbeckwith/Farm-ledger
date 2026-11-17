import { Pause, Play, Scissors, Sprout } from "lucide-react";
import { formatDoy, waterHolding } from "@/lib/acre/climate";
import { formatFlux, formatMass, ledgerTime, paceLabel, tHa } from "@/lib/acre/format";
import { SPEEDS, useAcre } from "@/lib/acre/store";
import type { Crop } from "@/lib/acre/types";
import { qualityOf } from "@/lib/acre/step";

const FLUXES: { key: "fixation" | "mineralizationN" | "uptakeN" | "nitrification" | "denitrification" | "leachingN" | "volatilization" | "uptakeP" | "mineralizationP" | "uptakeK"; label: string }[] = [
  { key: "fixation", label: "N₂ fixation" },
  { key: "mineralizationN", label: "N mineralized" },
  { key: "uptakeN", label: "N uptake" },
  { key: "nitrification", label: "Nitrification" },
  { key: "denitrification", label: "Denitrification" },
  { key: "leachingN", label: "NO₃⁻ leach" },
  { key: "volatilization", label: "NH₃ loss" },
  { key: "mineralizationP", label: "P mineralized" },
  { key: "uptakeP", label: "P uptake" },
  { key: "uptakeK", label: "K uptake" },
];

export function harvestState(crop: Crop, development: number, shoot: number, econ: number, stubble: boolean, peak: number) {
  const quality = qualityOf(crop, development, shoot, econ);
  const declining = !stubble && peak > 0.72 && quality < peak - 0.06;
  const ready =
    !stubble &&
    quality >= 0.08 &&
    (crop.perennial ? shoot >= 0.08 : econ >= 0.012 || development >= 0.8);
  let label = crop.perennial ? "Cut hay" : "Harvest";
  if (stubble) label = "Replant";
  else if (ready) label = declining ? `${crop.perennial ? "Cut" : "Harvest"} · declining` : `${label} · ${Math.round(quality * 100)}%`;
  else if (development > 1.25) label = "Window missed";
  else label = "Not ready";
  return { quality, declining, ready, label };
}

export function Ledger({ crop }: { crop: Crop }) {
  const day = useAcre((s) => s.day);
  const shoot = useAcre((s) => s.shoot);
  const econ = useAcre((s) => s.econ);
  const stubble = useAcre((s) => s.stubble);
  const running = useAcre((s) => s.running);
  const speed = useAcre((s) => s.speed);
  const quality = useAcre((s) => s.quality);
  const peakQuality = useAcre((s) => s.peakQuality);
  const limiter = useAcre((s) => s.limiter);
  const doy = useAcre((s) => s.doy);
  const temperature = useAcre((s) => s.temperature);
  const water = useAcre((s) => s.water);
  const drivers = useAcre((s) => s.drivers);
  const fixedN = useAcre((s) => s.fixedN);
  const leachedN = useAcre((s) => s.leachedN);
  const denitrifiedN = useAcre((s) => s.denitrifiedN);
  const mineralizedN = useAcre((s) => s.mineralizedN);
  const fluxes = useAcre((s) => s.fluxes);
  const bank = useAcre((s) => s.bank);
  const cuts = useAcre((s) => s.cuts);
  const lastHarvest = useAcre((s) => s.lastHarvest);
  const note = useAcre((s) => s.note);
  const development = useAcre((s) => s.development);
  const toggleRun = useAcre((s) => s.toggleRun);
  const setSpeed = useAcre((s) => s.setSpeed);
  const harvest = useAcre((s) => s.harvest);
  const replant = useAcre((s) => s.replant);
  const clearBank = useAcre((s) => s.clearBank);
  const advance = useAcre((s) => s.advance);

  const time = ledgerTime(day);
  const action = harvestState(crop, development, shoot, econ, stubble, peakQuality);
  const whc = waterHolding(drivers.texture, drivers.compaction, drivers.om);
  const sat = whc > 0 ? water / whc : 0;

  return (
    <section className="grid gap-4">
      <div className="rounded-lg border border-line bg-surface p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-widest text-muted uppercase">Stand age</p>
            <p className="font-display text-5xl leading-none text-fg tabular-nums sm:text-6xl">{time.day}</p>
            <p className="mt-1 text-sm text-muted">Day</p>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-right">
            {[
              ["Week", time.week],
              ["Month", time.month],
              ["Year", time.year],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <dt className="text-xs tracking-wide text-muted uppercase">{label}</dt>
                <dd className="font-display text-2xl text-gold tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-3 h-px bg-line">
          <div className="h-px bg-gold transition-[width] duration-150" style={{ width: `${time.frac * 100}%` }} />
        </div>
        <p className="mt-3 text-sm text-muted">
          {formatDoy(doy)} · {temperature.toFixed(1)}°C · {paceLabel(running ? speed : 0)}
          {crop.perennial ? ` · ${cuts} cut${cuts === 1 ? "" : "s"}` : ""}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleRun}
            disabled={stubble}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-raised px-3 text-sm text-fg transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
          >
            {running && !stubble ? <Pause className="size-4" /> : <Play className="size-4" />}
            {running && !stubble ? "Pause" : "Run"}
          </button>
          {SPEEDS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSpeed(value)}
              aria-pressed={speed === value && running}
              className={
                "h-11 rounded-md px-3 text-sm tabular-nums transition-transform duration-150 ease-out active:scale-[0.96] " +
                (speed === value && running
                  ? "bg-gold text-bg"
                  : "border border-line bg-raised text-fg")
              }
            >
              {value}×
            </button>
          ))}
          <button
            type="button"
            onClick={() => advance(7)}
            disabled={stubble}
            className="h-11 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
          >
            +7 d
          </button>
          <button
            type="button"
            onClick={() => advance(30)}
            disabled={stubble}
            className="h-11 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
          >
            +30 d
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">1× is one day every 10 seconds. Higher speeds only compress the clock.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Biomass", `${tHa(shoot + econ)} t/ha`],
          [crop.perennial ? "Canopy" : "Economic", `${tHa(crop.perennial ? shoot : econ)} t/ha`],
          ["Quality", `${Math.round(quality * 100)}%`],
          ["Water", `${Math.round(sat * 100)}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-bg px-3 py-2">
            <p className="text-xs text-muted">{label}</p>
            <p className="font-display text-xl text-fg tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted">
        Limited by <span className="text-gold">{limiter}</span>
        {action.declining ? " · past the peak, mass is leaving the stand" : ""}
      </p>
      {note ? <p className="text-sm text-fg">{note}</p> : null}

      <div className="hidden gap-2 lg:flex">
        {stubble ? (
          <>
            <button
              type="button"
              onClick={() => replant(false)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-gold text-bg transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              <Sprout className="size-4" />
              Replant
            </button>
            <button
              type="button"
              onClick={() => replant(true)}
              className="h-12 rounded-md border border-line px-4 text-sm text-fg"
            >
              Fresh soil
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={!action.ready}
            onClick={harvest}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-gold text-bg transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-40"
          >
            <Scissors className="size-4" />
            {action.label}
          </button>
        )}
      </div>

      <div className="min-w-0 overflow-x-auto">
        <div className="flex w-max gap-2 pb-1">
        {FLUXES.map((flux) => (
          <div key={flux.key} className="min-w-28 shrink-0 rounded-md border border-line bg-bg px-2.5 py-2">
            <p className="text-xs text-muted">{flux.label}</p>
            <p className="font-display text-lg text-fg tabular-nums">
              {formatFlux(fluxes[flux.key])}
              <span className="ml-1 text-xs text-muted">kg</span>
            </p>
          </div>
        ))}
        </div>
      </div>
      <p className="text-xs text-muted">Fluxes are kg/ha/day. N from air {fixedN.toFixed(0)} · mineralized {mineralizedN.toFixed(0)} · leached {leachedN.toFixed(0)} · denitrified {denitrifiedN.toFixed(0)}</p>

      <div className="rounded-lg border border-line bg-surface p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-lg">Barn ledger</h2>
          {bank.length > 0 && (
            <button type="button" onClick={clearBank} className="text-sm text-muted">
              Clear
            </button>
          )}
        </div>
        {lastHarvest && (
          <p className="mt-1 text-sm text-muted">
            Last, day {lastHarvest.day}: {lastHarvest.headline} at {Math.round(lastHarvest.quality * 100)}% quality
          </p>
        )}
        {bank.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing in the barn yet. Take it on the peak, or wait and lose it to shatter and respiration.</p>
        ) : (
          <ul className="mt-3 grid gap-1">
            {bank.map((item) => (
              <li key={item.key} className="flex items-baseline justify-between gap-3 text-sm">
                <span className={item.constituent ? "pl-4 text-muted" : "text-fg"}>
                  {item.constituent ? "of which " : ""}
                  {item.crop} · {item.label}
                </span>
                <span className="font-display text-gold tabular-nums">{formatMass(item.kg)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
