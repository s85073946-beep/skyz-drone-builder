import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSimulator } from "@/lib/sim/useSimulator";
import { Intro } from "@/components/sim/Intro";
import { DroneCursor } from "@/components/sim/DroneCursor";
import { Workspace } from "@/components/sim/Workspace";
import { BottomBar, Instructions, Library, TopBar } from "@/components/sim/Panels";
import { CompletionOverlay } from "@/components/sim/CompletionOverlay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKYZ Drone Electrical Assembly Simulator" },
      {
        name: "description",
        content:
          "Interactive SKYZ drone electrical assembly simulator: wire battery, PDB, 4-in-1 ESC, motors, flight controller, GPS and receiver, then install propellers.",
      },
      { property: "og:title", content: "SKYZ Drone Electrical Assembly Simulator" },
      {
        property: "og:description",
        content:
          "Train on real drone hardware: power, motors, flight electronics and propeller installation in a staged engineering simulator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulatorPage,
});

function SimulatorPage() {
  const [intro, setIntro] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const sim = useSimulator();

  const pulse = sim.flash ? (sim.flash.kind === "ok" ? "ok" : "bad") : null;
  const endIntro = useCallback(() => setIntro(false), []);

  useEffect(() => {
    document.body.classList.toggle("no-cursor", !intro);
    return () => document.body.classList.remove("no-cursor");
  }, [intro]);

  if (intro) return <Intro onDone={endIntro} />;

  return (
    <main className="sim-root">
      <TopBar sim={sim} />
      <div className="sim-body">
        <Library sim={sim} />
        <Workspace sim={sim} onDragState={setDragging} />
        <Instructions sim={sim} />
      </div>
      <BottomBar sim={sim} onReset={() => setConfirmReset(true)} />

      {confirmReset && (
        <div className="overlay">
          <div className="confirm-card">
            <h3>Reset assembly?</h3>
            <p>All connections, score and elapsed time will be cleared.</p>
            <div className="complete-actions">
              <button
                className="btn-primary"
                data-hoverable
                onClick={() => {
                  sim.reset();
                  setConfirmReset(false);
                }}
              >
                Reset simulation
              </button>
              <button className="btn-ghost" data-hoverable onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {sim.done && <CompletionOverlay sim={sim} onRestart={sim.reset} />}
      <DroneCursor state={dragging ? "drag" : "idle"} pulse={pulse} />
    </main>
  );
}