// DraggableItem.tsx
import { useState, useEffect, useRef } from "react";
import type { DraggableItemProps, Position } from "./types";

export function DragableWrapper({
  id,
  initialX = 0,
  initialY = 0,
  children,
  onPositionChange,
  gridSnap,
}: DraggableItemProps) {
  const [pos, setPos] = useState<Position>({ x: initialX, y: initialY });
  const dragging = useRef<boolean>(false);
  const offset = useRef<Position>({ x: 0, y: 0 });

  const snap = (value: number): number =>
    gridSnap ? Math.round(value / gridSnap) * gridSnap : value;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const newPos: Position = {
        x: snap(e.clientX - offset.current.x),
        y: snap(e.clientY - offset.current.y),
      };
      setPos(newPos);
      onPositionChange?.(id, newPos);
    };

    const onMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [id, gridSnap, onPositionChange]);

  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{ left: pos.x, top: pos.y }}
    >
      {children}
    </div>
  );
}
