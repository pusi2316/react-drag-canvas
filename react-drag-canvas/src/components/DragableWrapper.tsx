import { useState, useEffect, useRef } from "react";
import type { DraggableItemProps, Position } from "./types";

export function DragableWrapper({
  id,
  initialX = 0,
  initialY = 0,
  children,
  onPositionChange,
  gridSnap,
  canvasRef,
}: DraggableItemProps) {
  const [pos, setPos] = useState<Position>({ x: initialX, y: initialY });
  const dragging = useRef<boolean>(false);
  const offset = useRef<Position>({ x: 0, y: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const snap = (value: number): number =>
    gridSnap ? Math.round(value / gridSnap) * gridSnap : value;

  const clamp = (x: number, y: number): Position => {
    if (!canvasRef?.current || !itemRef.current) return { x, y };
    const canvas = canvasRef.current.getBoundingClientRect();
    const item = itemRef.current.getBoundingClientRect();

    return {
      x: Math.min(Math.max(0, x), canvas.width - item.width),
      y: Math.min(Math.max(0, y), canvas.height - item.height),
    };
  };

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
      const clamped = clamp(newPos.x, newPos.y);
      setPos(clamped);
      onPositionChange?.(id, clamped);
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
      ref={itemRef}
      onMouseDown={onMouseDown}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{ left: pos.x, top: pos.y }}
    >
      {children}
    </div>
  );
}
