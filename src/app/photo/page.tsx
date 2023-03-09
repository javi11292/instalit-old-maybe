import { Suspense } from "react";

import LikeButton from "./like-button";
import Viewer from "./viewer";

export default function Photo() {
  return (
    <Suspense>
      <Viewer />
      <div className="p-1">
        <LikeButton />
      </div>
    </Suspense>
  );
}
