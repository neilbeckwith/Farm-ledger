import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HistPoint } from "@/lib/acre/types";

function Tip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number }[];
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-fg">
      <div className="font-display tabular-nums">Day {label}</div>
      {payload.map((p) => (
        <div key={String(p.name)} className="tabular-nums text-muted">
          {p.name} {Number(p.value ?? 0).toFixed(2)}
        </div>
      ))}
    </div>
  );
}

export function TrendChart({ history, perennial }: { history: HistPoint[]; perennial: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <section className="rounded-lg border border-line bg-surface p-3">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg text-fg">Stand curve</h2>
        <p className="text-xs text-muted">{perennial ? "Canopy dry matter" : "Dry matter, tonnes per hectare"}</p>
      </div>
      <div className="h-36">
        {!ready || history.length < 2 ? (
          <p className="flex h-full items-center text-sm text-muted">The curve starts as the first days close.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={{ stroke: "var(--color-line)" }}
                tickLine={false}
                minTickGap={24}
              />
              <YAxis
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip content={<Tip />} />
              <Line
                type="monotone"
                dataKey="biomass"
                name="Biomass"
                stroke="var(--color-leaf)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              {!perennial && (
                <Line
                  type="monotone"
                  dataKey="economic"
                  name="Economic"
                  stroke="var(--color-gold)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
