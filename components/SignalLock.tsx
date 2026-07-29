"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { track } from "@/lib/analytics";
import styles from "./SignalLock.module.css";

/**
 * SIGNAL LOCK — a small bench-instrument game.
 *
 * Match the hidden reference trace by tuning frequency and phase. It reuses the
 * site's oscilloscope language (graticule, brand-red trace, meter readouts)
 * rather than being a generic arcade game bolted on.
 *
 * Constraints honoured:
 *  - No dependencies; canvas 2D only.
 *  - Never runs on page load. The rAF loop starts only when the player presses
 *    Start, and the canvas isn't even mounted until it scrolls into view.
 *  - Fully keyboard-playable (arrows tune, Space starts/pauses, R restarts) and
 *    pointer/touch-draggable.
 *  - Every piece of state a sighted player reads off the scope is also exposed as
 *    text, and round/score changes are announced via a polite live region.
 *  - Reduced motion: the idle sweep is suppressed; the trace still redraws when
 *    the player tunes, because that IS the feedback, not decoration.
 */

const ROUND_SECONDS = 60;
const FREQ_MIN = 1;
const FREQ_MAX = 8;
const STORAGE_KEY = "signal-lock-best";

// Lock tolerance tightens as the score climbs, so it keeps getting harder.
const lockTarget = (score: number) => Math.min(0.97, 0.9 + score * 0.005);

interface Trace {
  freq: number;
  phase: number;
}

/** Deterministic-enough target generator; avoids landing on the current tuning. */
function newTarget(prev?: Trace): Trace {
  let freq = 0;
  let phase = 0;
  do {
    freq = FREQ_MIN + Math.random() * (FREQ_MAX - FREQ_MIN);
    phase = Math.random() * 360;
  } while (prev && Math.abs(freq - prev.freq) < 1.5);
  return { freq, phase };
}

/** Shortest angular distance between two angles, in degrees (0..180). */
function phaseDelta(a: number, b: number) {
  const d = Math.abs(((a - b) % 360) + 360) % 360;
  return d > 180 ? 360 - d : d;
}

/** 0..1, where 1 is a perfect match. */
function lockRatio(player: Trace, target: Trace) {
  const fErr = Math.abs(player.freq - target.freq) / (FREQ_MAX - FREQ_MIN);
  const pErr = phaseDelta(player.phase, target.phase) / 180;
  return Math.max(0, 1 - (fErr * 0.65 + pErr * 0.35) * 2.2);
}

type Phase = "idle" | "running" | "paused" | "over";

export function SignalLock() {
  const reduced = usePrefersReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [readout, setReadout] = useState({ freq: 4, phase: 180, lock: 0 });
  const [message, setMessage] = useState("");

  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Trace>({ freq: 4, phase: 180 });
  const targetRef = useRef<Trace>({ freq: 6, phase: 90 });
  const scoreRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const deadlineRef = useRef(0);
  const colorsRef = useRef({ trace: "#DE1F27", ghost: "#8a9099", grid: "#d7d8d9" });

  // Only mount the canvas once the section is on screen — the game must never
  // cost anything on initial page load. The stored best score is read here too,
  // in the same callback, since it isn't needed before the game is visible.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const activate = () => {
      setMounted(true);
      try {
        const stored = Number(localStorage.getItem(STORAGE_KEY));
        if (Number.isFinite(stored) && stored > 0) setBest(stored);
      } catch {
        /* private mode / storage disabled — the game runs without a best score */
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(activate);
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          activate();
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Theme-aware colours pulled from the design tokens, refreshed when the theme
  // flips so the trace doesn't stay light-mode red on the dark bench.
  const readColors = useCallback(() => {
    if (!canvasRef.current) return;
    const cs = getComputedStyle(canvasRef.current);
    colorsRef.current = {
      trace: cs.getPropertyValue("--sl-trace").trim() || "#DE1F27",
      ghost: cs.getPropertyValue("--sl-ghost").trim() || "#8a9099",
      grid: cs.getPropertyValue("--sl-grid").trim() || "#d7d8d9",
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [mounted, readColors]);

  const draw = useCallback(
    (t: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const { trace, ghost, grid } = colorsRef.current;
      const mid = h / 2;
      const amp = h * 0.32;

      // Graticule
      ctx.strokeStyle = grid;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= w; x += w / 10) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, h);
      }
      for (let y = 0; y <= h; y += h / 6) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      const wave = (tr: Trace, drift: number) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const u = x / w;
          const y =
            mid -
            Math.sin(u * tr.freq * Math.PI * 2 + (tr.phase * Math.PI) / 180 + drift) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      };

      // Reference trace (what you're chasing) — dashed and dim.
      ctx.strokeStyle = ghost;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      wave(targetRef.current, 0);
      ctx.setLineDash([]);

      // Player trace. The slow drift is the only idle animation, and it is the
      // thing reduced-motion users opt out of.
      ctx.strokeStyle = trace;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      wave(playerRef.current, reduced ? 0 : Math.sin(t / 1400) * 0.08);
    },
    [reduced],
  );

  const endGame = useCallback(() => {
    setPhase("over");
    const final = scoreRef.current;
    setBest((b) => {
      const next = Math.max(b, final);
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setMessage(
      `Time. You locked ${final} signal${final === 1 ? "" : "s"}. Press Restart to play again.`,
    );
  }, []);

  // The single animation loop. Runs only while `phase === "running"`.
  useEffect(() => {
    if (!mounted || phase !== "running") return;

    const tick = (t: number) => {
      const remaining = Math.max(0, deadlineRef.current - performance.now());
      setTimeLeft(Math.ceil(remaining / 1000));

      const ratio = lockRatio(playerRef.current, targetRef.current);
      setReadout({
        freq: playerRef.current.freq,
        phase: playerRef.current.phase,
        lock: ratio,
      });

      if (ratio >= lockTarget(scoreRef.current)) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        targetRef.current = newTarget(playerRef.current);
        setMessage(`Locked. ${scoreRef.current} captured.`);
      }

      draw(t);

      if (remaining <= 0) {
        endGame();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, phase, draw, endGame]);

  // Keep a static frame painted while idle/paused/over so the scope is never blank.
  useEffect(() => {
    if (!mounted || phase === "running") return;
    const id = requestAnimationFrame((t) => draw(t));
    return () => cancelAnimationFrame(id);
  }, [mounted, phase, draw]);

  const start = useCallback(() => {
    // Engagement signal only — deliberately NOT a key event. Playing a game is
    // not a lead, and marking it as a conversion would corrupt conversion rate.
    track("game_played", { link_position: "body", label: "signal_lock" });
    scoreRef.current = 0;
    setScore(0);
    playerRef.current = { freq: 4, phase: 180 };
    targetRef.current = newTarget();
    deadlineRef.current = performance.now() + ROUND_SECONDS * 1000;
    setTimeLeft(ROUND_SECONDS);
    setMessage("Signal running. Tune frequency and phase to match the dashed trace.");
    setPhase("running");
  }, []);

  const togglePause = useCallback(() => {
    setPhase((p) => {
      if (p === "running") {
        setMessage("Paused.");
        return "paused";
      }
      if (p === "paused") {
        // Give back the time spent paused rather than punishing the player.
        deadlineRef.current = performance.now() + timeLeft * 1000;
        setMessage("Resumed.");
        return "running";
      }
      return p;
    });
  }, [timeLeft]);

  const tune = useCallback((dFreq: number, dPhase: number) => {
    const p = playerRef.current;
    playerRef.current = {
      freq: Math.min(FREQ_MAX, Math.max(FREQ_MIN, p.freq + dFreq)),
      phase: (((p.phase + dPhase) % 360) + 360) % 360,
    };
    setReadout({
      freq: playerRef.current.freq,
      phase: playerRef.current.phase,
      lock: lockRatio(playerRef.current, targetRef.current),
    });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = e.shiftKey;
    switch (e.key) {
      case "ArrowLeft":
        tune(big ? -0.5 : -0.1, 0);
        break;
      case "ArrowRight":
        tune(big ? 0.5 : 0.1, 0);
        break;
      case "ArrowUp":
        tune(0, big ? 15 : 5);
        break;
      case "ArrowDown":
        tune(0, big ? -15 : -5);
        break;
      case " ":
      case "Enter":
        if (phase === "idle" || phase === "over") start();
        else togglePause();
        break;
      case "r":
      case "R":
        start();
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  // Pointer/touch tuning: horizontal drag = frequency, vertical = phase.
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if (phase !== "running") return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || phase !== "running") return;
    tune((e.clientX - d.x) * 0.02, (d.y - e.clientY) * -0.6);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => {
    dragRef.current = null;
  };

  const lockPct = Math.round(readout.lock * 100);
  const targetPct = Math.round(lockTarget(score) * 100);

  return (
    <div className={styles.wrap} ref={hostRef}>
      <div className={styles.head}>
        <p className="eyebrow">Bench simulator</p>
        <h3 className={styles.title}>
          Signal Lock<span className="dot">.</span>
        </h3>
        <p className={styles.lede}>
          Tune the red trace onto the dashed reference. Match {targetPct}% and it
          locks. As many as you can in {ROUND_SECONDS} seconds.
        </p>
      </div>

      <div className={styles.scopeShell}>
        {mounted ? (
          <canvas
            ref={canvasRef}
            className={styles.scope}
            role="img"
            aria-label={`Oscilloscope. Frequency ${readout.freq.toFixed(1)} kilohertz, phase ${Math.round(readout.phase)} degrees, ${lockPct} percent locked.`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />
        ) : (
          <div className={styles.scopePlaceholder} aria-hidden="true" />
        )}

        {phase !== "running" && mounted && (
          <div className={styles.overlay}>
            <p className={styles.overlayText}>
              {phase === "idle" && "Press Start to power up the bench."}
              {phase === "paused" && "Paused."}
              {phase === "over" && `Time — ${score} locked.`}
            </p>
          </div>
        )}
      </div>

      {/* Every value the scope shows, as text. Useful for everyone, essential
          for anyone who can't read the trace. */}
      <dl className={styles.readouts}>
        <div className={styles.readout}>
          <dt>Frequency</dt>
          <dd>{readout.freq.toFixed(1)} kHz</dd>
        </div>
        <div className={styles.readout}>
          <dt>Phase</dt>
          <dd>{Math.round(readout.phase)}°</dd>
        </div>
        <div className={styles.readout}>
          <dt>Lock</dt>
          <dd>
            <span className={styles.meter} aria-hidden="true">
              <span className={styles.meterFill} style={{ width: `${lockPct}%` }} />
            </span>
            {lockPct}%
          </dd>
        </div>
        <div className={styles.readout}>
          <dt>Time</dt>
          <dd>{timeLeft}s</dd>
        </div>
        <div className={styles.readout}>
          <dt>Locked</dt>
          <dd>{score}</dd>
        </div>
        <div className={styles.readout}>
          <dt>Best</dt>
          <dd>{best}</dd>
        </div>
      </dl>

      <div className={styles.controls}>
        <button type="button" className={styles.primary} onClick={start}>
          {phase === "idle" ? "Start" : "Restart"}
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={togglePause}
          disabled={phase !== "running" && phase !== "paused"}
        >
          {phase === "paused" ? "Resume" : "Pause"}
        </button>

        <div className={styles.tuners}>
          <button type="button" onClick={() => tune(-0.1, 0)} aria-label="Decrease frequency">
            Freq −
          </button>
          <button type="button" onClick={() => tune(0.1, 0)} aria-label="Increase frequency">
            Freq +
          </button>
          <button type="button" onClick={() => tune(0, -5)} aria-label="Decrease phase">
            Phase −
          </button>
          <button type="button" onClick={() => tune(0, 5)} aria-label="Increase phase">
            Phase +
          </button>
        </div>
      </div>

      <p className={styles.hint}>
        Focus the scope and use <kbd>←</kbd> <kbd>→</kbd> for frequency,{" "}
        <kbd>↑</kbd> <kbd>↓</kbd> for phase (hold <kbd>Shift</kbd> for coarse),{" "}
        <kbd>Space</kbd> to start or pause, <kbd>R</kbd> to restart. On a phone,
        drag across the scope.
      </p>

      <p className={styles.live} role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
