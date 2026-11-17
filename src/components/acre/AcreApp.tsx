import { useEffect, useState } from "react";
import { RotateCcw, Scissors, Sprout } from "lucide-react";
import { getSite, waterHolding } from "@/lib/acre/climate";
import { getCrop } from "@/lib/acre/crops";
import { clamp } from "@/lib/acre/math";
import { snapshot, useAcre, type Persisted } from "@/lib/acre/store";
import { stageName } from "@/lib/acre/step";
import { Controls, type TabId } from "@/components/acre/Controls";
import { FieldView } from "@/components/acre/FieldView";
import { harvestState, Ledger } from "@/components/acre/Ledger";
import { TrendChart } from "@/components/acre/TrendChart";

const STORAGE = "acre-ledger-v1";

export function AcreApp() {
  const [tab, setTab] = useState<TabId>("crop");

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    let acc = 0;
    let pending = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const live = useAcre.getState();
      if (live.running && live.speed > 0 && !live.stubble) pending += dt * (live.speed / 10);
      acc += dt;
      if (acc >= 0.1) {
        acc = 0;
        if (pending > 0) {
          const stepDays = pending;
          pending = 0;
          useAcre.getState().advance(stepDays);
        }
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const data = JSON.parse(raw) as Persisted;
      if (data && data.v === 1) useAcre.getState().hydrate(data);
    } catch {
      /* ignore broken saves */
    }
  }, []);

  useEffect(() => {
    let timer = 0;
    const unsub = useAcre.subscribe((state) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        try {
          localStorage.setItem(STORAGE, JSON.stringify(snapshot(state)));
        } catch {
          /* storage full or blocked */
        }
      }, 500);
    });
    return () => {
      unsub();
      window.clearTimeout(timer);
    };
  }, []);

  const cropId = useAcre((s) => s.cropId);
  const siteId = useAcre((s) => s.siteId);
  const development = useAcre((s) => s.development);
  const shoot = useAcre((s) => s.shoot);
  const econ = useAcre((s) => s.econ);
  const rootFrac = useAcre((s) => s.rootFrac);
  const emerged = useAcre((s) => s.emerged);
  const stubble = useAcre((s) => s.stubble);
  const doy = useAcre((s) => s.doy);
  const temperature = useAcre((s) => s.temperature);
  const water = useAcre((s) => s.water);
  const stresses = useAcre((s) => s.stresses);
  const drivers = useAcre((s) => s.drivers);
  const history = useAcre((s) => s.history);
  const peakQuality = useAcre((s) => s.peakQuality);
  const harvest = useAcre((s) => s.harvest);
  const replant = useAcre((s) => s.replant);
  const reset = useAcre((s) => s.reset);

  const crop = getCrop(cropId);
  const site = getSite(siteId);
  const action = harvestState(crop, development, shoot, econ, stubble, peakQuality);
  const whc = waterHolding(drivers.texture, drivers.compaction, drivers.om);
  const veg = crop.perennial
    ? clamp(shoot / Math.max(0.08, crop.maxShoot), 0, 1)
    : clamp(1 - Math.exp(-3.3 * Math.max(0, development - 0.05) / 0.6), 0, 1);
  const heightFrac = emerged ? veg * (0.72 + 0.28 * clamp(stresses.water, 0, 1)) : 0;
  const sen = crop.perennial
    ? clamp((development - 1) / 0.45, 0, 1)
    : clamp((development - 0.9) / 0.38, 0, 1);
  const heightCm = (stubble ? 0.08 : heightFrac) * crop.maxHeightCm;
  const rootCm = rootFrac * crop.maxRootCm;

  return (
    <div className="min-h-dvh overflow-x-clip bg-bg text-fg">
      <header className="mx-auto flex max-w-6xl items-end justify-between gap-3 px-4 py-4 lg:px-6">
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">Biogeochemical stand</p>
          <h1 className="font-display text-3xl text-balance text-fg sm:text-4xl">Acre Ledger</h1>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <p className="max-w-40 text-right text-sm text-pretty text-muted sm:max-w-56">{site.name}</p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center gap-1.5 rounded-md border border-line px-3 text-sm text-muted transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-4 px-3 pb-28 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)] lg:px-6 lg:pb-8">
        <div className="grid min-w-0 content-start gap-4">
          <div className="relative overflow-hidden rounded-lg border border-line">
            <div className="pointer-events-none absolute inset-3 z-10 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-3 text-sm">
                <div>
                  <p className="text-fg">{crop.name}</p>
                  <p className="text-xs text-muted italic">{crop.latin}</p>
                </div>
                <p className="text-right text-muted">
                  {stageName(crop, development, stubble)}
                  <span className="mt-0.5 block text-xs tabular-nums">
                    {Math.round(heightCm)} cm · roots {Math.round(rootCm)} cm
                  </span>
                </p>
              </div>
            </div>
            <div className="h-72 sm:h-96">
              <FieldView
                form={crop.form}
                head={crop.head}
                rootShape={crop.rootShape}
                heightFrac={heightFrac}
                senescence={sen}
                development={development}
                econFrac={clamp(econ / 0.85, 0, 1)}
                rootFrac={rootFrac}
                nodules={crop.maxFix > 1 && drivers.inoculation > 0.35}
                wilt={clamp(1 - stresses.water, 0, 1)}
                stubble={stubble}
                emerged={emerged}
                saturation={whc > 0 ? water / whc : 0}
                temperature={temperature}
                doy={doy}
              />
            </div>
          </div>
          <Ledger crop={crop} />
          <TrendChart history={history} perennial={crop.perennial} />
        </div>
        <div className="min-w-0 lg:sticky lg:top-3 lg:max-h-[calc(100dvh-1.5rem)] lg:overflow-auto">
          <Controls tab={tab} setTab={setTab} />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface p-3 lg:hidden">
        {stubble ? (
          <div className="mx-auto flex max-w-6xl gap-2">
            <button
              type="button"
              onClick={() => replant(false)}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-gold text-bg active:scale-[0.96]"
            >
              <Sprout className="size-4" />
              Replant
            </button>
            <button
              type="button"
              onClick={() => replant(true)}
              className="h-12 rounded-md border border-line px-3 text-sm text-fg"
            >
              Fresh soil
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={!action.ready}
            onClick={harvest}
            className="mx-auto flex h-12 w-full max-w-6xl items-center justify-center gap-2 rounded-md bg-gold text-bg active:scale-[0.96] disabled:opacity-40"
          >
            <Scissors className="size-4" />
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
