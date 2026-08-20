import { useRef } from "react";
import type { PartDef } from "@/lib/sim/types";

interface Props {
  def: PartDef;
  pos: { x: number; y: number };
  scale: number;
  selected: string | null;
  connectedPorts: string[];
  hintPorts: string[];
  badPorts: string[];
  hasProp: boolean;
  propImg: string;
  onMove: (x: number, y: number) => void;
  onPort: (key: string) => void;
  onDragState: (dragging: boolean) => void;
  bounds: { w: number; h: number };
}

export function PartNode({
  def,
  pos,
  scale,
  selected,
  connectedPorts,
  hintPorts,
  badPorts,
  hasProp,
  propImg,
  onMove,
  onPort,
  onDragState,
  bounds,
}: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).dataset["port"]) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { dx: e.clientX / scale - pos.x, dy: e.clientY / scale - pos.y };
    onDragState(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const x = Math.min(bounds.w - def.w, Math.max(0, e.clientX / scale - drag.current.dx));
    const y = Math.min(bounds.h - def.h, Math.max(0, e.clientY / scale - drag.current.dy));
    onMove(x, y);
  };

  const stop = () => {
    if (drag.current) onDragState(false);
    drag.current = null;
  };

  return (
    <div
      className="part"
      data-hoverable
      style={{ left: pos.x, top: pos.y, width: def.w, height: def.h }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      data-part={def.id}
    >
      <img src={def.img} alt={def.name} className="part-img" draggable={false} />
      {hasProp && (
        <img
          src={propImg}
          alt="Installed propeller"
          className="part-prop-installed"
          draggable={false}
        />
      )}
      <span className="part-tag">{def.short}</span>
      {def.ports.map((p) => {
        const key = `${def.id}:${p.id}`;
        const state = connectedPorts.includes(key)
          ? "on"
          : badPorts.includes(key)
            ? "bad"
            : selected === key
              ? "sel"
              : hintPorts.includes(key)
                ? "hint"
                : "idle";
        return (
          <button
            key={key}
            data-port={key}
            className="port"
            data-state={state}
            data-kind={p.kind}
            title={`${def.short} · ${p.label}`}
            style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onPort(key);
            }}
          />
        );
      })}
    </div>
  );
}