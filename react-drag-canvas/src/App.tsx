// Usage — App.tsx
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

  return (
    <Canvas gridSize={20}>
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
    </Canvas>
  );
}
