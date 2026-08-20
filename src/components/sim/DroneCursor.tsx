import { useEffect, useRef, useState } from "react";
import { IMG } from "@/lib/sim/data";

interface Props {
  state: "idle" | "drag";
  pulse: "ok" | "bad" | null;
}

export function DroneCursor({ state, pulse }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("button, [data-hoverable]"));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  if (!enabled) return null;

  const scale = state === "drag" ? 0.82 : hover ? 1.18 : 1;

  return (
    <div ref={ref} className="drone-cursor" aria-hidden>
      <div
        className="drone-cursor-body"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        data-pulse={pulse ?? undefined}
      >
        <img src={IMG.pdb} alt="" className="dc-frame" draggable={false} />
        {[0, 1, 2, 3].map((i) => (
          <img
            key={i}
            src={IMG.prop}
            alt=""
            draggable={false}
            className="dc-prop"
            style={{
              left: i % 2 === 0 ? "-2px" : "auto",
              right: i % 2 === 1 ? "-2px" : "auto",
              top: i < 2 ? "-2px" : "auto",
              bottom: i >= 2 ? "-2px" : "auto",
              animationDelay: `${i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}