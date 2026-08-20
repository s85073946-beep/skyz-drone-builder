import { LINKS } from "@/lib/sim/data";
import type { Sim } from "@/lib/sim/useSimulator";

export function CompletionOverlay({ sim, onRestart }: { sim: Sim; onRestart: () => void }) {
  const mm = String(Math.floor(sim.seconds / 60)).padStart(2, "0");
  const ss = String(sim.seconds % 60).padStart(2, "0");
  return (
    <div className="overlay">
      <div className="complete-card">
        <p className="complete-status">SYSTEM READY</p>
        <h2 className="complete-brand">SKYZ DRONE TECHNOLOGY</h2>
        <p className="complete-sub">ASSEMBLY COMPLETE</p>
        <div className="complete-stats">
          <div>
            <span>Score</span>
            <strong>{sim.score}</strong>
          </div>
          <div>
            <span>Time</span>
            <strong className="mono">
              {mm}:{ss}
            </strong>
          </div>
          <div>
            <span>Correct connections</span>
            <strong>
              {sim.links.length + sim.propsOn.length}/{LINKS.length + 4}
            </strong>
          </div>
          <div>
            <span>Mistakes</span>
            <strong>{sim.mistakes}</strong>
          </div>
          <div>
            <span>Hints used</span>
            <strong>{sim.hints}</strong>
          </div>
        </div>
        <div className="complete-actions">
          <button className="btn-primary" onClick={onRestart} data-hoverable>
            Restart Simulation
          </button>
          <button className="btn-ghost" onClick={onRestart} data-hoverable>
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
}