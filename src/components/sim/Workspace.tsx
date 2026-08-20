import { useEffect, useRef, useState } from "react";
import { IMG, PARTS, WORKSPACE, partById } from "@/lib/sim/data";
import type { Sim } from "@/lib/sim/useSimulator";
import { PartNode } from "./PartNode";
import { Wires } from "./Wires";

export function Workspace({
  sim,
  onDragState,
}: {
  sim: Sim;
  onDragState: (d: boolean) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(1, el.clientWidth / WORKSPACE.w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const connectedPorts = sim.links.flatMap((l) => [l.from, l.to]);

  return (
    <section className="workspace-wrap" ref={wrap}>
      <div className="workspace-head">
        <span>Assembly Workspace</span>
        <span className="ws-hint">
          {sim.selected ? "Select the matching connector…" : "Select a connector to start a wire"}
        </span>
      </div>
      <div
        className="workspace"
        style={{
          width: WORKSPACE.w,
          height: WORKSPACE.h,
          transform: `scale(${scale})`,
        }}
      >
        <Wires links={sim.links} positions={sim.positions} w={WORKSPACE.w} h={WORKSPACE.h} />
        {PARTS.filter((p) => sim.positions[p.id]).map((def) => (
          <div
            key={def.id}
            onDragOver={(e) => {
              if (def.id.startsWith("motor") && sim.stage === 5) e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              const propId = e.dataTransfer.getData("text/plain");
              if (propId) sim.mountProp(propId, def.id);
            }}
          >
            <PartNode
              def={def}
              pos={sim.positions[def.id] ?? def.home}
              scale={scale}
              selected={sim.selected}
              connectedPorts={connectedPorts}
              hintPorts={sim.hintPorts}
              badPorts={sim.badPorts}
              hasProp={sim.propsOn.includes(def.id.replace("motor", "prop"))}
              propImg={IMG.prop}
              onMove={(x, y) => sim.move(def.id, x, y)}
              onPort={sim.clickPort}
              onDragState={onDragState}
              bounds={WORKSPACE}
            />
          </div>
        ))}
        {sim.stage === 5 &&
          sim.hintPorts
            .filter((h) => h.endsWith(":shaft"))
            .map((h) => {
              const id = h.split(":")[0] ?? "";
              const p = sim.positions[id];
              const def = partById(id);
              if (!p) return null;
              return (
                <div
                  key={h}
                  className="shaft-hint"
                  style={{ left: p.x + def.w / 2 - 24, top: p.y - 10 }}
                />
              );
            })}
      </div>
    </section>
  );
}