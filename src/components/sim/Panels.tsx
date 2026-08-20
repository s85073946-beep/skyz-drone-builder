import { IMG, LINKS, PARTS, PROPS, STAGES } from "@/lib/sim/data";
import type { Sim } from "@/lib/sim/useSimulator";

export function TopBar({ sim }: { sim: Sim }) {
  const stage = STAGES.find((s) => s.id === sim.stage)!;
  const mm = String(Math.floor(sim.seconds / 60)).padStart(2, "0");
  const ss = String(sim.seconds % 60).padStart(2, "0");
  return (
    <header className="topbar">
      <div className="brand-block">
        <span className="brand">SKYZ</span>
        <span className="brand-sub">DRONE TECHNOLOGY</span>
      </div>
      <div className="title-block">
        <h1>Drone Electrical Assembly Simulator</h1>
        <p>
          Stage {stage.id} / 5 — <strong>{stage.name}</strong>
        </p>
      </div>
      <div className="meters">
        <div className="meter">
          <span className="meter-label">Progress</span>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${sim.progress}%` }} />
          </div>
          <span className="meter-value">{sim.progress}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Connections</span>
          <span className="stat-value">
            {sim.links.length}/{LINKS.length}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Score</span>
          <span className="stat-value">{sim.score}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Time</span>
          <span className="stat-value mono">
            {mm}:{ss}
          </span>
        </div>
      </div>
    </header>
  );
}

export function Library({ sim }: { sim: Sim }) {
  const available = PARTS.filter((p) => p.stage <= Math.min(sim.stage, 3));
  const locked = PARTS.filter((p) => p.stage > Math.min(sim.stage, 3));
  return (
    <aside className="panel panel-left">
      <h2 className="panel-title">Component Library</h2>
      <div className="lib-list">
        {available.map((p) => (
          <div key={p.id} className="lib-item" data-hoverable>
            <img src={p.img} alt={p.name} draggable={false} />
            <div>
              <p className="lib-name">{p.name}</p>
              <p className="lib-spec">{p.spec}</p>
            </div>
          </div>
        ))}
        {sim.stage === 5 &&
          PROPS.filter((p) => !sim.propsOn.includes(p.id)).map((p) => (
            <div
              key={p.id}
              className="lib-item lib-prop"
              data-hoverable
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", p.id)}
            >
              <img src={IMG.prop} alt={p.name} draggable={false} />
              <div>
                <p className="lib-name">{p.name}</p>
                <p className="lib-spec">Drag onto its matching motor shaft</p>
              </div>
            </div>
          ))}
        {locked.map((p) => (
          <div key={p.id} className="lib-item locked">
            <img src={p.img} alt="" draggable={false} />
            <div>
              <p className="lib-name">{p.name}</p>
              <p className="lib-spec">Locked — stage {p.stage}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function Instructions({ sim }: { sim: Sim }) {
  const stage = STAGES.find((s) => s.id === sim.stage)!;
  const list = sim.stage >= 4 ? LINKS : LINKS.filter((l) => l.stage === sim.stage);
  return (
    <aside className="panel panel-right">
      <h2 className="panel-title">Connection Instructions</h2>
      <p className="stage-brief">{stage.brief}</p>
      <ol className="conn-list">
        {list.map((l) => {
          const ok = sim.links.some((m) => m.id === l.id);
          return (
            <li key={l.id} className={ok ? "done" : ""}>
              <span className="dot" />
              {l.label}
            </li>
          );
        })}
        {sim.stage === 5 &&
          PROPS.map((p) => (
            <li key={p.id} className={sim.propsOn.includes(p.id) ? "done" : ""}>
              <span className="dot" />
              {p.name} → {p.motor.replace("motor", "Motor ")}
            </li>
          ))}
      </ol>
      <div className="status-block">
        <h3>Status</h3>
        <p>
          Mistakes <strong>{sim.mistakes}</strong>
        </p>
        <p>
          Hints used <strong>{sim.hints}</strong>
        </p>
        <p className="hint-text">
          Click one connector, then its partner to route a wire. Drag components to reposition —
          wires follow.
        </p>
      </div>
    </aside>
  );
}

export function BottomBar({
  sim,
  onReset,
}: {
  sim: Sim;
  onReset: () => void;
}) {
  return (
    <footer className="bottombar">
      <button className="btn-ghost" onClick={onReset} data-hoverable>
        Reset
      </button>
      <div className="flash-slot">
        {sim.flash && <span className={`flash flash-${sim.flash.kind}`}>{sim.flash.message}</span>}
      </div>
      <button className="btn-ghost" onClick={sim.useHint} data-hoverable>
        Hint (−3)
      </button>
      <button className="btn-primary" onClick={sim.checkAssembly} data-hoverable>
        Check Assembly
      </button>
    </footer>
  );
}