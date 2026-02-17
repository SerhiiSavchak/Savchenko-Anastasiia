"use client";

import { useRef, useEffect } from "react";

const FLOW_ANCHOR_SELECTOR = "[data-flow-anchor]";

export interface FlowAnchorProps {
  id: string;
  /** Optional: offset from top of element (0-1, e.g. 0.5 = center) */
  offsetY?: number;
  /** Optional: offset from left of element (0-1) */
  offsetX?: number;
}

/**
 * Invisible anchor element for FlowLine path routing.
 * Place near section headings or key visual elements.
 * FlowLine queries all [data-flow-anchor] elements in DOM order to build the path.
 */
export function FlowAnchor({ id, offsetY = 0.15, offsetX = 0.5 }: FlowAnchorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("flow-anchors-changed"));
    return () => {
      window.dispatchEvent(new CustomEvent("flow-anchors-changed"));
    };
  }, [id]);

  return (
    <div
      ref={ref}
      data-flow-anchor={id}
      data-flow-offset-y={String(offsetY)}
      data-flow-offset-x={String(offsetX)}
      className="absolute w-px h-px opacity-0 pointer-events-none overflow-hidden"
      style={{
        top: `${offsetY * 100}%`,
        left: `${offsetX * 100}%`,
      }}
      aria-hidden
    />
  );
}

export { FLOW_ANCHOR_SELECTOR };
