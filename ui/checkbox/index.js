import IconButton from "ui/icon-button";
import * as css from "./css";

export default function Checkbox({ children, checked }) {
  return (
    <div css={css.container}>
      <IconButton
        disableHover
        css={[css.check, !checked && css.unchecked]}
        buttonCss={css.checkButton}
        icon={checked ? "done" : undefined}
      />
      {children}
    </div>
  );
}
