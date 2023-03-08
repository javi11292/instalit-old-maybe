import Viewer from "./viewer";

export default function Photo() {
  return (
    <div className="flex h-full flex-col">
      <Viewer />
      <div>Buttons</div>
    </div>
  );
}
