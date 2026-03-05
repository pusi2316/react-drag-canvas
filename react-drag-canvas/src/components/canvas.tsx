import { useRef } from "react";
import { type DraggableItemProps, type CanvasProps } from "./types";
import React from "react";
import { useItemPositions } from "./useItemPositions";

export function Canvas({
  children,
  className = "",
  gridSize,
  locked,
  onDragEnd,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { savedPositions, savePosition } = useItemPositions();
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
          ...(onDragEnd && { onDragEnd }),
          ...(savedPos && { initialX: savedPos.x, initialY: savedPos.y }),
        });
      })}
    </div>
  );
}
