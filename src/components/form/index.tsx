"use client";

import { useCallback, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";

import Button, { ButtonProps } from "commons/components/button";
import Input, { InputProps } from "commons/components/input";
import { classNames } from "commons/utils";
import { post } from "commons/utils/fetch";
import { withErrorMessage } from "utils/error-message";

export default function Form<
  T extends Readonly<({ name: string } & InputProps)[]>
>({
  fields,
  primaryButton,
  secondaryButton,
  secondaryButtonProps,
  onSubmit,
  api,
  className,
  title,
}: {
  title?: string;
  className?: string;
  fields: T;
  api: string;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  secondaryButtonProps?: Omit<ButtonProps, "children">;
  onSubmit?: (
    trigger: () => Promise<unknown>,
    props: Record<T[number]["name"], string>
  ) => void;
}) {
  const elements = useRef<Record<string, HTMLInputElement>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const { trigger, isMutating } = useSWRMutation(api, post);

  const handleRef = useCallback((target: HTMLInputElement) => {
    if (!target) return;
    if (target.dataset.index === "0") target.focus();
    elements.current[target.name] = target;
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({ ...state, [target.name]: target.value }));
  };

  const submit = () => {
    withErrorMessage(() => {
      return onSubmit
        ? onSubmit(() => trigger(values), values)
        : trigger(values);
    });
  };

  const handleKeyDown = ({
    key,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      const element =
        elements.current[
          fields[parseInt(currentTarget.dataset.index as string) + 1]?.name
        ];

      if (element) {
        element.focus();
      } else {
        submit();
      }
    }
  };

  return (
    <div className={classNames("grid max-w-xl gap-2 p-4", className)}>
      <h1 className="text-2xl">{title}</h1>
      {fields.map(({ name, ...field }, index) => (
        <Input
          inputRef={handleRef}
          data-index={index}
          key={name}
          name={name}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={values[name]}
          {...field}
        />
      ))}

      <div className="mt-4 flex justify-between">
        {secondaryButton && (
          <Button variant="outlined" {...secondaryButtonProps}>
            {secondaryButton}
          </Button>
        )}

        {primaryButton && (
          <Button
            className="ml-auto"
            variant="contained"
            onClick={submit}
            loading={isMutating}
          >
            {primaryButton}
          </Button>
        )}
      </div>
    </div>
  );
}
