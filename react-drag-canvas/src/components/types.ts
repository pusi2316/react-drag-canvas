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
  locked?: boolean;
}

export interface CanvasProps {
  children: React.ReactNode;
  className?: string;
  gridSize?: number;
  locked: boolean;
  onDragEnd?: (id: string, position: Position) => void;
}

export interface CanvasItem {
  id: string;
  position: Position;
  component: React.ReactNode;
}

export type Action =
  | { type: "UPDATE_POSITION"; id: string; position: Position }
  | { type: "RESET" };
