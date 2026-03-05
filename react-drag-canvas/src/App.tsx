import { useState } from "react";
import { Canvas } from "./components/canvas";
import { DragableWrapper } from "./components/DragableWrapper";
import MyCard from "./components/MyCard";

export default function App() {
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
          <DragableWrapper id="static card" gridSnap={20}>
            <MyCard title="Static Card" className="min-w-200 border-2" />
          </DragableWrapper>
          <DragableWrapper id="free card">
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
