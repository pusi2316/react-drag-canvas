import { useState } from "react";
import { Canvas } from "./components/canvas";
import { DragableWrapper } from "./components/DragableWrapper";
import MyCard from "./components/MyCard";
import type { CanvasItem } from "./components/types";
import { useCanvasItems } from "./components/useCanvasItems";

const initialItems: CanvasItem[] = [
  {
    id: "card-1",
    position: { x: 100, y: 80 },
    component: <MyCard title="Notes" />,
  },
  {
    id: "card-2",
    position: { x: 400, y: 200 },
    component: <MyCard title="Tasks" />,
  },
];

export default function App() {
  const { items, updatePosition } = useCanvasItems(initialItems);
  const [locked_, setLocked] = useState(false);
  return (
    <>
      <input
        type="checkbox"
        id="lock"
        className="mb-4"
        checked={locked_}
        onChange={(e) => setLocked(e.target.checked)}
      />
      <div className="p-20">
        <Canvas
          className="bg-white shadow-lg rounded-lg p-4 cursor-move"
          locked={locked_}
        >
          {items.map((item) => (
            <DragableWrapper
              key={item.id}
              id={item.id}
              initialX={item.position.x}
              initialY={item.position.y}
              onPositionChange={updatePosition}
              gridSnap={20}
            >
              {item.component}
            </DragableWrapper>
          ))}
          <DragableWrapper
            id="static card"
            onPositionChange={updatePosition}
            gridSnap={20}
          >
            <MyCard title="Static Card" className="min-w-200 border-2" />
          </DragableWrapper>
          <DragableWrapper id="free card" onPositionChange={updatePosition}>
            <h1 className="text-2xl font-bold bg-blue-100 p-4 rounded">
              {" "}
              dsfdasf{" "}
            </h1>
          </DragableWrapper>
        </Canvas>
      </div>
    </>
  );
}
