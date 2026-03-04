import { useEffect, useRef } from "react";
import type { CanvasProps } from "./types";
import React from "react";

export function Canvas({
  children,
  className = "",
  gridSize,
  locked,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={canvasRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
      style={
        gridSize
          ? {
              backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }
          : undefined
      }
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, {
              canvasRef,
              locked,
            })
          : child
      )}
    </div>
  );
}
