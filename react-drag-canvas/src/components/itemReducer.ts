import type { Action, CanvasItem, Position } from "./types";

export const itemReducer = (
  state: CanvasItem[],
  action: Action
): CanvasItem[] => {
  switch (action.type) {
    case "UPDATE_POSITION":
      const updated = state.map((item) =>
        item.id === action.id ? { ...item, position: action.position } : item
      );
      const positions = updated.reduce<Record<string, Position>>(
        (acc, item) => {
          acc[item.id] = item.position;
          return acc;
        },
        {}
      );
      localStorage.setItem("canvas-positions", JSON.stringify(positions)); // 👈 save here directly
      return updated;
    case "RESET":
      return [];
    default:
      return state;
  }
};
