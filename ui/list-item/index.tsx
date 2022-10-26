import { forwardRef } from "react";

import { classNames } from "libraries/utils";

import styles from "./index.module.scss";

function ListItem(
  {
    children,
    active,
    ...props
  }: { children: React.ReactNode; active?: boolean },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      className={classNames(styles.container, active && styles.active)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

export default forwardRef(ListItem);
