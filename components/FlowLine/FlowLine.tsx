"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { FLOW_ANCHOR_SELECTOR } from "./FlowAnchor";

const LERP_FACTOR = 0.08;
const GUTTER = 32;
const DEBUG = process.env.NEXT_PUBLIC_FLOW_DEBUG === "true";

interface Point {
  x: number;
  y: number;
}

/**
 * Minimal path: single vertical line along left gutter.
 * Connects section anchors (all in gutter) — never touches content.
 * Reversible: scroll down = draw, scroll up = retract.
 */
function buildPath(points: Point[]): string {
  if (points.length < 2) return "";

  const segments: string[] = [];
  segments.push(`M ${GUTTER} ${points[0].y}`);

  for (let i = 1; i < points.length; i++) {
    segments.push(`L ${GUTTER} ${points[i].y}`);
  }

  return segments.join(" ");
}

function getAnchorPoints(): Point[] {
  const anchors = document.querySelectorAll<HTMLElement>(FLOW_ANCHOR_SELECTOR);
  return Array.from(anchors).map((el) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + rect.height / 2 + window.scrollY,
    };
  });
}

export function FlowLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const ghostPathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState("");
  const [totalLength, setTotalLength] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const updatePath = useCallback(() => {
    const points = getAnchorPoints();
    if (points.length < 2) {
      setPathD("");
      setTotalLength(0);
      return;
    }

    const d = buildPath(points);
    setPathD(d);

    requestAnimationFrame(() => {
      const path = pathRef.current;
      if (path) setTotalLength(path.getTotalLength());
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    updatePath();
    const t1 = setTimeout(updatePath, 100);
    const t2 = setTimeout(updatePath, 500);

    const handleResize = () => updatePath();
    const handleAnchorsChanged = () => setTimeout(updatePath, 50);

    window.addEventListener("resize", handleResize);
    window.addEventListener("flow-anchors-changed", handleAnchorsChanged);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("flow-anchors-changed", handleAnchorsChanged);
    };
  }, [updatePath]);

  useEffect(() => {
    if (!pathD || totalLength <= 0) return;

    const updateProgress = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      targetProgressRef.current = docH > 0 ? Math.min(1, Math.max(0, scrollY / docH)) : 0;
    };

    const animate = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const next = current + (target - current) * LERP_FACTOR;
      currentProgressRef.current = next;

      const dashoffset = totalLength * (1 - next);
      if (pathRef.current) pathRef.current.style.strokeDashoffset = String(dashoffset);
      if (ghostPathRef.current) ghostPathRef.current.style.strokeDashoffset = String(dashoffset);

      const svg = pathRef.current?.closest("svg");
      if (svg) {
        const sy = window.scrollY;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        svg.setAttribute("viewBox", `0 ${sy} ${vw} ${vh}`);
      }

      if (Math.abs(next - target) > 0.0001) rafRef.current = requestAnimationFrame(animate);
      else rafRef.current = null;
    };

    const onScroll = () => {
      updateProgress();
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [pathD, totalLength, reducedMotion]);

  if (pathD === "") return null;

  const dashArray = totalLength;
  const showStatic = reducedMotion;

  return (
    <div
      className="flow-line-overlay"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      aria-hidden
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 ${typeof window !== "undefined" ? window.scrollY : 0} ${typeof window !== "undefined" ? window.innerWidth : 1920} ${typeof window !== "undefined" ? window.innerHeight : 1080}`}
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <path
          ref={ghostPathRef}
          d={pathD}
          fill="none"
          stroke="var(--flow-line-color)"
          strokeWidth="var(--flow-line-width)"
          strokeLinecap="square"
          strokeLinejoin="miter"
          opacity={0.1}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: showStatic ? 0 : totalLength * (1 - currentProgressRef.current),
          }}
        />
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--flow-line-color)"
          strokeWidth="var(--flow-line-width)"
          strokeLinecap="square"
          strokeLinejoin="miter"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: showStatic ? 0 : totalLength * (1 - currentProgressRef.current),
          }}
        />
      </svg>

      {DEBUG && (
        <FlowLineDebug />
      )}
    </div>
  );
}

function FlowLineDebug() {
  const [anchors, setAnchors] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const update = () => {
      const els = document.querySelectorAll<HTMLElement>(FLOW_ANCHOR_SELECTOR);
      setAnchors(
        Array.from(els).map((el) => {
          const rect = el.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        })
      );
    };
    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      {anchors.map((a, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            left: a.x - 6,
            top: a.y - 6,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "red",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
