export interface Position {
  x: number;
  y: number;
}

export interface DraggableItemProps {
  id: string;
  initialX?: number;
  initialY?: number;
  children: React.ReactNode;
  onPositionChange?: (id: string, position: Position) => void;
  bounds?: boolean;
  gridSnap?: number; // snap to grid (px)
  canvasRef?: React.RefObject<HTMLDivElement>; // for bounds checking
}

export interface CanvasProps {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
}

export interface CanvasItem {
  id: string;
  position: Position;
  component: React.ReactNode;
}
