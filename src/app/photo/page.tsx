import LikeButton from "./like-button";
import Viewer from "./viewer";

export default function Photo() {
  return (
    <>
      <Viewer />
      <div className="p-1">
        <LikeButton />
      </div>
    </>
  );
}
