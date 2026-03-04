// Canvas.tsx
import type { CanvasProps } from "./types";

export function Canvas({ children, className = "", gridSize }: CanvasProps) {
  return (
    <div
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
      {children}
    </div>
  );
}
