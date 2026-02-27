export default function MyCard({ title }: { title: string }) {
  return (
    <div className="w-48 p-4 bg-white rounded shadow">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">
        This is a draggable card. You can move it around the canvas.
      </p>
    </div>
  );
}
