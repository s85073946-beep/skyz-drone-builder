import { useEffect, useState } from "react";
import { IMG } from "@/lib/sim/data";

export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 3500),
      setTimeout(onDone, 4100),
    ];
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className={`intro ${phase >= 4 ? "intro-out" : ""}`}>
      <div className="intro-grid" />
      <div className="intro-drone">
        <img src={IMG.pdb} alt="Drone airframe" className="intro-frame" draggable={false} />
        {[
          { top: "-46px", left: "-30px" },
          { top: "-46px", right: "-30px" },
          { bottom: "-46px", left: "-30px" },
          { bottom: "-46px", right: "-30px" },
        ].map((pos, i) => (
          <div key={i} className="intro-rotor" style={pos}>
            <img src={IMG.motor} alt="" className="intro-motor" draggable={false} />
            <img src={IMG.prop} alt="" className="intro-prop" draggable={false} />
          </div>
        ))}
      </div>

      <div className="intro-text">
        <h1 className={`intro-brand ${phase >= 1 ? "on" : ""}`}>SKYZ</h1>
        <p className={`intro-sub ${phase >= 2 ? "on" : ""}`}>DRONE TECHNOLOGY</p>
        <p className={`intro-tag ${phase >= 3 ? "on" : ""}`}>Drone Electrical Assembly Simulator</p>
      </div>

      <button className="btn-ghost intro-skip" onClick={onDone}>
        Skip Intro
      </button>
    </div>
  );
}