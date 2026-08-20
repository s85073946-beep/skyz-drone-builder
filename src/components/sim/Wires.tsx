import { PARTS } from "@/lib/sim/data";
import type { MadeLink } from "@/lib/sim/types";

interface Props {
  links: MadeLink[];
  positions: Record<string, { x: number; y: number }>;
  w: number;
  h: number;
}

export function portPoint(
  key: string,
  positions: Record<string, { x: number; y: number }>,
): { x: number; y: number } | null {
  const partId = key.split(":")[0] ?? "";
  const portId = key.split(":")[1] ?? "";
  const pos = positions[partId];
  const def = PARTS.find((p) => p.id === partId);
  if (!pos || !def) return null;
  const port = def.ports.find((p) => p.id === portId);
  if (!port) return null;
  return { x: pos.x + port.x * def.w, y: pos.y + port.y * def.h };
}

export function Wires({ links, positions, w, h }: Props) {
  return (
    <svg className="wires" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {links.map((l) => {
        const a = portPoint(l.from, positions);
        const b = portPoint(l.to, positions);
        if (!a || !b) return null;
        const dx = Math.max(40, Math.abs(b.x - a.x) * 0.5);
        const d = `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
        const partId = l.from.split(":")[0] ?? "";
        const portId = l.from.split(":")[1] ?? "";
        const kind = PARTS.find((p) => p.id === partId)?.ports.find((p) => p.id === portId)?.kind;
        const power = kind !== "signal";
        return (
          <g key={l.id}>
            <path d={d} className="wire-shadow" />
            <path d={d} className={power ? "wire wire-power" : "wire wire-signal"} />
          </g>
        );
      })}
    </svg>
  );
}