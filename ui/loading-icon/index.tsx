import { classNames } from "libraries/utils";

import styles from "./styles.module.css";

export default function LoadingIcon({ className }: { className: string }) {
  return (
    <svg
      className={classNames("h-6 w-6 animate-spin", className)}
      viewBox="22 22 44 44"
    >
      <circle
        className={styles.circle}
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        strokeWidth="3.6"
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}
