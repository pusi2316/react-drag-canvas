import { useCallback, useMemo, useRef } from "react";
import {
  type DraggableItemProps,
  type CanvasProps,
  type Position,
} from "./types";
import React from "react";

export function Canvas({
  children,
  className = "",
  gridSize,
  locked,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const savedPositions = useMemo<Record<string, Position>>(() => {
    try {
      const saved = localStorage.getItem("canvas-positions");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }, []);

  const savePosition = useCallback((id: string, position: Position): void => {
    try {
      const saved = localStorage.getItem("canvas-positions");
      const positions: Record<string, Position> = saved
        ? JSON.parse(saved)
        : {};
      positions[id] = position;
      localStorage.setItem("canvas-positions", JSON.stringify(positions));
    } catch (e) {
      console.error("failed to save position:", e);
    }
  }, []);
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
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<DraggableItemProps>(child)) return child;

        const id = child.props.id as string;
        const savedPos = savedPositions[id];

        return React.cloneElement(child as React.ReactElement<any>, {
          canvasRef,
          locked,
          onPositionChange: savePosition,
          ...(savedPos && { initialX: savedPos.x, initialY: savedPos.y }),
        });
      })}
    </div>
  );
}
