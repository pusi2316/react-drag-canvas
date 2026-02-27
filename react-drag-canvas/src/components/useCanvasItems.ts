import { useState, useCallback } from "react";
import type { Position, CanvasItem } from "./types";

export function useCanvasItems(initial: CanvasItem[] = []) {
  const [items, setItems] = useState<CanvasItem[]>(initial);

  const updatePosition = useCallback((id: string, position: Position) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position } : item))
    );
  }, []);

  const addItem = useCallback((item: CanvasItem) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return { items, updatePosition, addItem, removeItem };
}
