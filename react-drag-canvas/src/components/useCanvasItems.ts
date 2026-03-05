import { useCallback, useReducer } from "react";
import type { Position, CanvasItem } from "./types";
import { itemReducer } from "./itemReducer";

export function useCanvasItems(initial: CanvasItem[] = []) {
  const [items, dispatch] = useReducer(itemReducer, initial, (init) => {
    const saved = localStorage.getItem("canvas-positions");
    if (!saved) return init;
    const positions: Record<string, Position> = JSON.parse(saved);
    if (!Array.isArray(init)) return initial;

    return init.map((item) => ({
      ...item,
      position: positions[item.id] || item.position,
    }));
    //return saved ? JSON.parse(saved) : init;
  });

  const updatePosition = useCallback((id: string, position: Position) => {
    dispatch({ type: "UPDATE_POSITION", id, position });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return { items, updatePosition, reset };
}
