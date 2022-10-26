import { forwardRef } from "react";

import { classNames } from "libraries/utils";
import { hover } from "ui/styles";
import LoadingIcon from "ui/loading-icon";

function Button(
  {
    variant,
    disableUpperCase,
    icon,
    className,
    loading,
    children,
    ...props
  }: React.HTMLAttributes<HTMLAnchorElement & HTMLButtonElement> & {
    description?: React.ReactNode;
    icon?: boolean;
    variant?: "filled" | undefined;
    disableUpperCase?: boolean;
    loading?: boolean;
  },
  ref: React.Ref<HTMLAnchorElement & HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={classNames(
        "relative overflow-hidden",
        loading && "pointer-events-none",
        className,
        icon
          ? "material-icons rounded-full p-2"
          : "rounded py-2 px-4 font-bold",
        hover,
        !disableUpperCase && !icon && "text-sm uppercase",
        variant === "filled"
          ? "bg-lime-500 text-black before:bg-black"
          : "before:bg-white"
      )}
      {...props}
    >
      <span
        className={classNames(
          "transition-all",
          loading ? "opacity-0" : "opacity-100"
        )}
      >
        {children}
      </span>
      {loading && (
        <LoadingIcon className="absolute inset-0 top-2/4 left-2/4 opacity-60 [translate:-50%_-50%]" />
      )}
    </button>
  );
}

export default forwardRef(Button);
