import Button, { sizes } from "ui/button";
import * as css from "./css";

export { sizes };

export default function IconButton({
  icon,
  className,
  size,
  buttonCss,
  ...props
}) {
  return (
    <Button
      className={className}
      css={css.container}
      buttonClassName="material-icons"
      buttonCss={[css.button, css.BUTTON[size], buttonCss]}
      disableUpperCase
      size={size}
      {...props}
    >
      {icon}
    </Button>
  );
}
