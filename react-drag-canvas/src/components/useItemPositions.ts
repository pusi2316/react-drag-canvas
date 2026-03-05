import { useCallback, useMemo } from "react";
import type { Position } from "./types";

export function useItemPositions() {
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
  return { savedPositions, savePosition };
}
