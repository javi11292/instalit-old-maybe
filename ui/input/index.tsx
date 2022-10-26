import { forwardRef } from "react";

import { classNames } from "libraries/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  value?: string;
};

function Input(
  { label, className, value = "", ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div
      className={classNames(
        "group relative border-b border-solid border-neutral-400 py-1 transition-all duration-200 focus-within:border-lime-500",
        className
      )}
    >
      {label && (
        <div
          className={classNames(
            "pointer-events-none absolute top-5 origin-left text-neutral-400 transition-all duration-200 group-focus-within:-translate-y-full group-focus-within:text-xs group-focus-within:text-lime-500",
            value && "-translate-y-full text-xs"
          )}
        >
          {label}
        </div>
      )}
      <input
        ref={ref}
        value={value}
        className={classNames("w-full", label && "pt-4")}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
