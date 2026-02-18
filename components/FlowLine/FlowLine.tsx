"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { FLOW_ANCHOR_SELECTOR } from "./FlowAnchor";

const LERP_FACTOR = 0.12;
const MOBILE_BREAKPOINT = 768;
const DEBUG = process.env.NEXT_PUBLIC_FLOW_DEBUG === "true";

interface Point {
  x: number;
  y: number;
}

/**
 * Weaving path: alternates left-right lanes, 90° corners only.
 * Routes through gutters — never touches content.
 * Desktop: full weaving. Mobile: simplified, fewer turns.
 */
function buildPath(
  points: Point[],
  viewportWidth: number,
  isMobile: boolean,
  documentHeight: number
): string {
  if (points.length < 2) return "";

  const margin = isMobile ? 40 : 48;
  const leftLane = margin;
  const rightLane = viewportWidth - margin;
  const step = isMobile ? 60 : 90;

  const segments: string[] = [];
  let prev = points[0];

  segments.push(`M ${prev.x} ${prev.y}`);

  for (let i = 1; i < points.length; i++) {
    const curr = points[i];
    const isLastSegment = i === points.length - 1;
    const isAboutSegment = !isMobile && i === 1;
    const isVIPSegment = !isMobile && i === 5 && points.length >= 6;

    if (isLastSegment && !isMobile) {
      const bendX = rightLane - 60;
      const docBottom = documentHeight - 24;
      segments.push(`L ${prev.x} ${prev.y + step}`);
      const y1 = prev.y + step;
      segments.push(`L ${rightLane} ${y1}`);
      segments.push(`L ${rightLane} ${curr.y}`);
      segments.push(`L ${bendX} ${curr.y}`);
      segments.push(`L ${bendX} ${docBottom}`);
    } else if (isMobile && isLastSegment) {
      const midY = (prev.y + curr.y) / 2;
      segments.push(`L ${prev.x} ${midY}`);
      segments.push(`L ${rightLane} ${midY}`);
      segments.push(`L ${rightLane} ${curr.y}`);
      segments.push(`L ${curr.x} ${curr.y}`);
    } else if (isMobile) {
      const midY = (prev.y + curr.y) / 2;
      const currOnRight = curr.x > viewportWidth / 2;
      const laneX = currOnRight ? rightLane : leftLane;
      segments.push(`L ${prev.x} ${midY}`);
      segments.push(`L ${laneX} ${midY}`);
      segments.push(`L ${laneX} ${curr.y}`);
      segments.push(`L ${curr.x} ${curr.y}`);
    } else if (isAboutSegment) {
      const currOnRight = curr.x > viewportWidth / 2;
      const laneX = currOnRight ? leftLane : rightLane;
      const nextLaneX = currOnRight ? rightLane : leftLane;
      const crossY = curr.y - 100;
      segments.push(`L ${prev.x} ${prev.y + step}`);
      segments.push(`L ${laneX} ${prev.y + step}`);
      segments.push(`L ${laneX} ${crossY}`);
      segments.push(`L ${nextLaneX} ${crossY}`);
      segments.push(`L ${curr.x} ${crossY}`);
      segments.push(`L ${curr.x} ${curr.y}`);
    } else if (isVIPSegment) {
      const currOnRight = curr.x > viewportWidth / 2;
      const laneX = currOnRight ? leftLane : rightLane;
      const nextLaneX = currOnRight ? rightLane : leftLane;
      const crossY = curr.y + 18;
      segments.push(`L ${prev.x} ${prev.y + step}`);
      segments.push(`L ${laneX} ${prev.y + step}`);
      segments.push(`L ${laneX} ${crossY}`);
      segments.push(`L ${nextLaneX} ${crossY}`);
      segments.push(`L ${curr.x} ${crossY}`);
      segments.push(`L ${curr.x} ${curr.y}`);
    } else {
      const currOnRight = curr.x > viewportWidth / 2;
      const laneX = currOnRight ? leftLane : rightLane;
      const nextLaneX = currOnRight ? rightLane : leftLane;

      segments.push(`L ${prev.x} ${prev.y + step}`);
      const y1 = prev.y + step;
      segments.push(`L ${laneX} ${y1}`);

      const y2 = curr.y - step;
      segments.push(`L ${laneX} ${y2}`);
      segments.push(`L ${nextLaneX} ${y2}`);
      segments.push(`L ${nextLaneX} ${curr.y}`);
      segments.push(`L ${curr.x} ${curr.y}`);
    }

    prev = curr;
  }

  return segments.join(" ");
}

function getAnchorPoints(): Point[] {
  const anchors = document.querySelectorAll<HTMLElement>(FLOW_ANCHOR_SELECTOR);
  return Array.from(anchors)
    .filter((el) => el.getAttribute("data-flow-anchor") !== "contacts")
    .map((el) => {
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
  const [isMobile, setIsMobile] = useState(false);
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

    const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
    const docH = typeof window !== "undefined" ? document.documentElement.scrollHeight : 3000;
    const mobile = vw < MOBILE_BREAKPOINT;
    const d = buildPath(points, vw, mobile, docH);
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
    const checkMobile = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: isMobile ? 0 : 20,
      }}
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
          opacity={0.18}
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
  const [lanes, setLanes] = useState({ left: 48, right: 0 });

  useEffect(() => {
    const update = () => {
      const els = document.querySelectorAll<HTMLElement>(FLOW_ANCHOR_SELECTOR);
      setAnchors(
        Array.from(els).map((el) => {
          const rect = el.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        })
      );
      const vw = window.innerWidth;
      setLanes({ left: 48, right: vw - 48 });
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
      {/* Lane guides */}
      <div
        style={{
          position: "fixed",
          left: lanes.left,
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(255,0,0,0.25)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: lanes.right,
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(255,0,0,0.25)",
          pointerEvents: "none",
        }}
      />
      {/* Anchor markers */}
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
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
