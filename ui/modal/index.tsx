import { createPortal } from "react-dom";

import Transition from "ui/transition";
import { classNames } from "libraries/utils";

import styles from "./index.module.scss";

function stopPropagation(event: React.MouseEvent) {
  event.stopPropagation();
}

export default function Modal({
  open,
  children,
  onClose,
  className,
}: {
  className?: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const content = (
    <Transition
      onClick={onClose}
      className={classNames(styles.backdrop, styles.appearEnd)}
      show={open}
      transitionClassName={styles.appearStart}
    >
      <Transition
        onClick={stopPropagation}
        className={classNames(
          styles.container,
          className,
          styles.appearGrowEnd
        )}
        show={open}
        transitionClassName={styles.appearGrowStart}
      >
        {children}
      </Transition>
    </Transition>
  );

  return createPortal(content, document.body);
}
