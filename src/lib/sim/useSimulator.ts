import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LINKS, PARTS, PROPS, TOTAL_TASKS, partById } from "./data";
import type { MadeLink } from "./types";

export type Flash = { kind: "ok" | "bad"; message: string; at: number } | null;

export function useSimulator() {
  const [stage, setStage] = useState(1);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [links, setLinks] = useState<MadeLink[]>([]);
  const [propsOn, setPropsOn] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [hintPorts, setHintPorts] = useState<string[]>([]);
  const [score, setScore] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flash, setFlash] = useState<Flash>(null);
  const [badPorts, setBadPorts] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  const placed = useMemo(() => Object.keys(positions), [positions]);

  const stageLinks = useCallback((s: number) => LINKS.filter((l) => l.stage === s), []);

  const stageComplete = useCallback(
    (s: number) => {
      if (s === 4) return LINKS.every((l) => links.some((m) => m.id === l.id));
      if (s === 5) return propsOn.length === 4;
      return stageLinks(s).every((l) => links.some((m) => m.id === l.id));
    },
    [links, propsOn, stageLinks],
  );

  const nextRequired = useMemo(() => {
    const pool = stage >= 4 ? LINKS : stageLinks(stage);
    return pool.find((l) => !links.some((m) => m.id === l.id)) ?? null;
  }, [stage, links, stageLinks]);

  const progress = Math.round(((links.length + propsOn.length) / TOTAL_TASKS) * 100);

  const place = useCallback((id: string) => {
    const def = partById(id);
    setPositions((p) => (p[id] ? p : { ...p, [id]: { ...def.home } }));
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setPositions((p) => ({ ...p, [id]: { x, y } }));
  }, []);

  const pushFlash = useCallback((kind: "ok" | "bad", message: string) => {
    setFlash({ kind, message, at: Date.now() });
  }, []);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 2200);
    return () => clearTimeout(t);
  }, [flash]);

  const clickPort = useCallback(
    (key: string) => {
      setHintPorts([]);
      if (!selected) {
        setSelected(key);
        return;
      }
      if (selected === key) {
        setSelected(null);
        return;
      }
      const a = selected;
      const b = key;
      setSelected(null);
      if (links.some((l) => l.from === a || l.to === a || l.from === b || l.to === b)) {
        pushFlash("bad", "Connector already in use");
        return;
      }
      const match = LINKS.find(
        (l) => (l.from === a && l.to === b) || (l.from === b && l.to === a),
      );
      const allowedStage = stage >= 4 ? 99 : stage;
      if (match && (match.stage <= allowedStage || stage >= 4)) {
        setLinks((ls) => [...ls, { id: match.id, from: match.from, to: match.to }]);
        pushFlash("ok", `Connected — ${match.label}`);
      } else if (match) {
        pushFlash("bad", "Incorrect Connection — component belongs to a later stage");
        setScore((s) => Math.max(0, s - 5));
        setMistakes((m) => m + 1);
        setBadPorts([a, b]);
        setTimeout(() => setBadPorts([]), 900);
      } else {
        pushFlash("bad", "Incorrect Connection");
        setScore((s) => Math.max(0, s - 5));
        setMistakes((m) => m + 1);
        setBadPorts([a, b]);
        setTimeout(() => setBadPorts([]), 900);
      }
    },
    [selected, links, stage, pushFlash],
  );

  const mountProp = useCallback(
    (propId: string, motorId: string) => {
      const rule = PROPS.find((p) => p.id === propId)!;
      if (rule.motor === motorId) {
        setPropsOn((p) => (p.includes(propId) ? p : [...p, propId]));
        pushFlash("ok", `${rule.name} mounted on ${motorId.replace("motor", "Motor ")}`);
        return true;
      }
      pushFlash("bad", "Incorrect Connection — wrong motor for this propeller");
      setScore((s) => Math.max(0, s - 5));
      setMistakes((m) => m + 1);
      return false;
    },
    [pushFlash],
  );

  const useHint = useCallback(() => {
    if (stage === 5) {
      const missing = PROPS.find((p) => !propsOn.includes(p.id));
      if (missing) {
        setHints((h) => h + 1);
        setScore((s) => Math.max(0, s - 3));
        setHintPorts([`${missing.motor}:shaft`]);
        pushFlash("ok", `Hint: ${missing.name} → ${missing.motor.replace("motor", "Motor ")}`);
      }
      return;
    }
    if (!nextRequired) return;
    setHints((h) => h + 1);
    setScore((s) => Math.max(0, s - 3));
    setHintPorts([nextRequired.from, nextRequired.to]);
    pushFlash("ok", `Hint: ${nextRequired.label}`);
      [nextRequired.from, nextRequired.to].forEach((k) => place(k.split(":")[0] ?? ""));
    setTimeout(() => setHintPorts([]), 6000);
  }, [nextRequired, place, pushFlash, stage, propsOn]);

  const checkAssembly = useCallback(() => {
    if (stage < 4) {
      if (stageComplete(stage)) {
        pushFlash("ok", `Stage ${stage} verified — next stage unlocked`);
        setStage(stage + 1);
      } else {
        const remaining = stageLinks(stage).filter((l) => !links.some((m) => m.id === l.id)).length;
        pushFlash("bad", `${remaining} connection(s) still missing in this stage`);
      }
      return;
    }
    if (stage === 4) {
      if (stageComplete(4)) {
        pushFlash("ok", "Electrical harness verified — propeller installation unlocked");
        setStage(5);
      } else {
        pushFlash("bad", "Harness incomplete — review the connection list");
      }
      return;
    }
    if (stageComplete(5)) {
      setDone(true);
      setRunning(false);
    } else {
      pushFlash("bad", `${4 - propsOn.length} propeller(s) not installed`);
    }
  }, [stage, stageComplete, stageLinks, links, propsOn, pushFlash]);

  useEffect(() => {
    if (stage === 5 && propsOn.length === 4 && !done) {
      setDone(true);
      setRunning(false);
    }
  }, [stage, propsOn, done]);

  const reset = useCallback(() => {
    setStage(1);
    setPositions({});
    setLinks([]);
    setPropsOn([]);
    setSelected(null);
    setHintPorts([]);
    setScore(100);
    setMistakes(0);
    setHints(0);
    setSeconds(0);
    setDone(false);
    setRunning(true);
    setFlash(null);
  }, []);

  useEffect(() => {
    // auto-place the parts belonging to the active stage
    PARTS.filter((p) => p.stage <= Math.min(stage, 3)).forEach((p) => place(p.id));
  }, [stage, place]);

  return {
    stage,
    positions,
    placed,
    links,
    propsOn,
    selected,
    hintPorts,
    badPorts,
    score,
    mistakes,
    hints,
    seconds,
    flash,
    done,
    progress,
    nextRequired,
    stageComplete,
    place,
    move,
    clickPort,
    mountProp,
    useHint,
    checkAssembly,
    reset,
  };
}

export type Sim = ReturnType<typeof useSimulator>;