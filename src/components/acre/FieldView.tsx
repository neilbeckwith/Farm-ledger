import { clamp } from "@/lib/acre/math";
import type { Form, Head, RootShape } from "@/lib/acre/types";

export interface FieldProps {
  form: Form;
  head: Head;
  rootShape: RootShape;
  heightFrac: number;
  senescence: number;
  development: number;
  econFrac: number;
  rootFrac: number;
  nodules: boolean;
  wilt: number;
  stubble: boolean;
  emerged: boolean;
  saturation: number;
  temperature: number;
  doy: number;
}

function pigment(sen: number): string {
  const t = clamp(sen, 0, 1);
  const r = Math.round(143 + (224 - 143) * t);
  const g = Math.round(173 + (160 - 173) * t);
  const b = Math.round(85 + (69 - 85) * t);
  return `rgb(${r} ${g} ${b})`;
}

const PAPER = "rgb(239 232 214)";
const GOLD = "rgb(224 160 69)";
const SOIL = "rgb(42 34 24)";
const SOIL_TOP = "rgb(72 58 36)";
const SKY = "rgb(36 48 32)";

function Leaves({
  h,
  lean,
  wilt,
  color,
  count,
}: {
  h: number;
  lean: number;
  wilt: number;
  color: string;
  count: number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const t = (i + 1) / (count + 1);
        const y = -h * t;
        const x = lean * t;
        const side = i % 2 === 0 ? -1 : 1;
        const droop = 4 + wilt * 18;
        return (
          <path
            key={i}
            d={`M ${x} ${y} q ${side * 14} ${-8} ${side * (22 + (i % 3) * 4)} ${droop}`}
            fill="none"
            stroke={color}
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeOpacity={0.95}
          />
        );
      })}
    </>
  );
}

function HeadShape({
  head,
  h,
  lean,
  color,
  development,
  econFrac,
}: {
  head: Head;
  h: number;
  lean: number;
  color: string;
  development: number;
  econFrac: number;
}) {
  if (development < 0.4 || head === "none") return null;
  const open = clamp((development - 0.4) / 0.35, 0, 1);
  const x = lean;
  const y = -h;
  if (head === "spike") {
    const len = 10 + open * 16;
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x={-1.6} y={-len} width={3.2} height={len} rx={1} fill={color} />
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={i}
            x1={0}
            y1={-2 - i * (len / 5)}
            x2={i % 2 === 0 ? 7 : -7}
            y2={-8 - i * (len / 5)}
            stroke={color}
            strokeWidth={1}
          />
        ))}
      </g>
    );
  }
  if (head === "panicle") {
    return (
      <g transform={`translate(${x} ${y})`}>
        {Array.from({ length: 7 }, (_, i) => {
          const side = i % 2 === 0 ? -1 : 1;
          const yy = -4 - (i % 4) * 5 * open;
          return (
            <line
              key={i}
              x1={0}
              y1={yy + 4}
              x2={side * (8 + (i % 3) * 3)}
              y2={yy}
              stroke={color}
              strokeWidth={1.2}
            />
          );
        })}
      </g>
    );
  }
  if (head === "ear") {
    const ey = -h * 0.48;
    return (
      <g>
        <ellipse cx={lean * 0.48 + 8} cy={ey} rx={4} ry={10 + open * 6} fill={color} />
        <path d={`M ${lean} ${y} l 0 -10`} stroke={color} strokeWidth={1.4} />
        {development > 0.5 &&
          Array.from({ length: 4 }, (_, i) => (
            <line
              key={i}
              x1={lean}
              y1={y - 2}
              x2={lean + (i - 1.5) * 4}
              y2={y - 12}
              stroke={PAPER}
              strokeOpacity={0.7}
              strokeWidth={0.8}
            />
          ))}
      </g>
    );
  }
  if (head === "pod") {
    return (
      <g transform={`translate(${x} ${y + 16})`}>
        {Array.from({ length: 3 }, (_, i) => (
          <ellipse
            key={i}
            cx={(i - 1) * 7}
            cy={8 + i * 6}
            rx={2.2}
            ry={5 + open * 3}
            fill={color}
            transform={`rotate(${(i - 1) * 18} ${(i - 1) * 7} ${8 + i * 6})`}
          />
        ))}
      </g>
    );
  }
  if (head === "disc") {
    const r = 7 + open * 6;
    return (
      <g transform={`translate(${x} ${y - r})`}>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={Math.cos(a) * (r - 2)}
              y1={Math.sin(a) * (r - 2)}
              x2={Math.cos(a) * (r + 6)}
              y2={Math.sin(a) * (r + 6)}
              stroke={GOLD}
              strokeWidth={1.6}
              strokeOpacity={open}
            />
          );
        })}
        <circle r={r * 0.55} fill={color} />
      </g>
    );
  }
  if (head === "raceme") {
    return (
      <g transform={`translate(${x} ${y})`}>
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx={i % 2 === 0 ? -3 : 3} cy={-i * 4 * open} r={1.7} fill={i < 3 ? PAPER : color} />
        ))}
      </g>
    );
  }
  if (head === "boll") {
    const openBoll = development > 0.9;
    return (
      <g transform={`translate(${lean * 0.6} ${-h * 0.55})`}>
        <circle r={5 + econFrac * 3} fill={openBoll ? PAPER : color} />
        {openBoll && <circle r={2} fill={GOLD} />}
      </g>
    );
  }
  return null;
}

function Roots({
  rootFrac,
  shape,
  econFrac,
  nodules,
}: {
  rootFrac: number;
  shape: RootShape;
  econFrac: number;
  nodules: boolean;
}) {
  const depth = 12 + rootFrac * 78;
  return (
    <g>
      <path
        d={`M 0 0 C -10 ${depth * 0.4}, -16 ${depth * 0.75}, -6 ${depth}`}
        fill="none"
        stroke={PAPER}
        strokeOpacity={0.35}
        strokeWidth={1.3}
      />
      <path
        d={`M 0 0 C 12 ${depth * 0.35}, 8 ${depth * 0.7}, 14 ${depth * 0.9}`}
        fill="none"
        stroke={PAPER}
        strokeOpacity={0.28}
        strokeWidth={1.2}
      />
      {shape === "tap" && (
        <path d={`M -4 6 L 0 ${18 + rootFrac * 36} L 4 6 Z`} fill={GOLD} fillOpacity={0.35 + econFrac * 0.5} />
      )}
      {shape === "globe" && (
        <ellipse
          cx={0}
          cy={16 + econFrac * 10}
          rx={6 + econFrac * 10}
          ry={8 + econFrac * 8}
          fill={GOLD}
          fillOpacity={0.45 + econFrac * 0.4}
        />
      )}
      {shape === "tuber" &&
        [ -10, 4, 14 ].map((cx, i) => (
          <ellipse
            key={cx}
            cx={cx}
            cy={18 + (i % 2) * 8}
            rx={4 + econFrac * 8}
            ry={3 + econFrac * 5}
            fill={GOLD}
            fillOpacity={0.4 + econFrac * 0.45}
          />
        ))}
      {nodules &&
        [8, 16, 26].map((cy) => (
          <circle key={cy} cx={cy % 16 === 0 ? -6 : 7} cy={cy * rootFrac} r={2.1} fill={pigment(0)} />
        ))}
    </g>
  );
}

function Plant({
  x,
  scale,
  delay,
  props,
}: {
  x: number;
  scale: number;
  delay: string;
  props: FieldProps;
}) {
  const color = pigment(props.stubble ? 1 : props.senescence);
  const tall = props.form === "maize" || props.form === "sunflower";
  const short = props.form === "root";
  const base = props.stubble ? 26 : props.emerged ? 18 + props.heightFrac * scale * (tall ? 200 : short ? 72 : 156) : 0;
  const lean = props.wilt * 12 * (x % 2 === 0 ? 1 : -0.4);
  const h = base;
  return (
    <g className="sway" style={{ animationDelay: delay }}>
      <g transform={`translate(${x} 268)`}>
        <Roots
          rootFrac={props.rootFrac}
          shape={props.stubble ? "none" : props.rootShape}
          econFrac={props.econFrac}
          nodules={props.nodules && props.emerged && !props.stubble}
        />
        {h > 2 && (
          <>
            <line x1={0} y1={0} x2={lean} y2={-h} stroke={color} strokeWidth={props.form === "maize" ? 3.4 : 2} strokeLinecap="round" />
            {!props.stubble && (
              <Leaves
                h={h}
                lean={lean}
                wilt={props.wilt}
                color={color}
                count={props.form === "forage" ? 3 : short ? 4 : 4}
              />
            )}
            {props.form === "forage" && !props.stubble &&
              [-6, 6].map((dx) => (
                <line key={dx} x1={dx} y1={0} x2={dx + lean * 0.5} y2={-h * 0.85} stroke={color} strokeWidth={1.3} />
              ))}
            {props.form === "brassica" && props.development < 0.32 && !props.stubble && (
              <path d={`M 0 0 q -18 -6 -22 8 M 0 0 q 16 -10 24 6`} fill="none" stroke={color} strokeWidth={2.4} />
            )}
            {!props.stubble && (
              <HeadShape
                head={props.head}
                h={h}
                lean={lean}
                color={color}
                development={props.development}
                econFrac={props.econFrac}
              />
            )}
          </>
        )}
        {!props.emerged && !props.stubble && <ellipse cx={0} cy={-2} rx={2.2} ry={1.3} fill={GOLD} />}
      </g>
    </g>
  );
}

export function FieldView(props: FieldProps) {
  const warmth = clamp((props.temperature + 6) / 32, 0, 1);
  const sunY = 118 - warmth * 62;
  const sunX = 70 + ((props.doy % 365) / 365) * 520;
  const plants = [70, 150, 230, 310, 400, 490, 570, 650];
  return (
    <svg viewBox="0 0 720 420" className="h-full w-full" role="img" aria-label="Living crop stand">
      <rect width="720" height="268" fill={SKY} />
      <circle cx={sunX} cy={sunY} r={22} fill={GOLD} opacity={0.85} />
      <rect y={250} width="720" height="18" fill="rgb(143 173 85)" opacity={0.14} />
      <rect y={268} width="720" height="152" fill={SOIL} />
      <rect y={268} width="720" height="18" fill={SOIL_TOP} />
      {props.saturation > 0.82 && (
        <rect y={274} width="720" height={10 + props.saturation * 8} fill={PAPER} opacity={0.12} />
      )}
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={40 + i * 78}
          y1={286}
          x2={40 + i * 78}
          y2={300}
          stroke={PAPER}
          strokeOpacity={0.12}
        />
      ))}
      {plants.map((x, i) => (
        <Plant
          key={x}
          x={x}
          scale={0.9 + ((i * 37) % 10) / 50}
          delay={`${i * 0.17}s`}
          props={props}
        />
      ))}
      {props.temperature < 0 && <rect width="720" height="420" fill={PAPER} opacity={0.06} />}
    </svg>
  );
}
