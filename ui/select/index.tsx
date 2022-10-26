import { useState } from "react";

import Input, { InputProps } from "ui/input";
import Tooltip from "ui/tooltip";
import Button from "ui/button";
import { classNames } from "libraries/utils";

import styles from "./index.module.scss";

function preventDefault(event: React.SyntheticEvent) {
  event.preventDefault();
}

export type Option = { label: string; value: string };

export type SelectProps<T = InputProps> = (T extends InputProps
  ? Omit<T, "onSelect" | "value">
  : never) & {
  options?: Option[];
  onSelect: (option?: Option) => void;
  value?: Option;
};

const DEFAULT_OPTIONS: Option[] = [];

export default function Select({
  options = DEFAULT_OPTIONS,
  onSelect,
  value,
  className,
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);

  function handleFocus() {
    setOpen(true);
  }

  function handleBlur() {
    setOpen(false);
  }

  function handleSelect({ currentTarget }: React.MouseEvent<HTMLElement>) {
    onSelect(options?.[parseInt(currentTarget.dataset.index as string)]);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  const content = options?.map((option, index) => (
    <Button
      disableUpperCase
      key={option.value}
      data-index={index}
      className={classNames(styles.option, option === value && styles.selected)}
      onMouseDown={preventDefault}
      onClick={handleSelect}
    >
      {option.label}
    </Button>
  ));

  return (
    <Tooltip
      className={className}
      contentClassName={styles.tooltip}
      content={content}
      show={open}
    >
      <Input
        readOnly
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value?.label}
        {...props}
      />
    </Tooltip>
  );
}
