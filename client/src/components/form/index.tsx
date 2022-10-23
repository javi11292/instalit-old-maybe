import { useState, useRef, useCallback } from "react";

import Input, { InputProps } from "ui/input";

export default function Form<
  T extends Readonly<({ name: string } & InputProps)[]>
>({
  fields,
  children,
  onSubmit,
}: {
  fields: T;
  children: ({ onClick }: { onClick: () => void }) => React.ReactNode;
  onSubmit: (props: Record<T[number]["name"], string>) => void;
}) {
  const elements = useRef<Record<string, HTMLInputElement>>({});
  const [values, setValues] = useState<Record<string, string>>({});

  const handleRef = useCallback((target: HTMLInputElement) => {
    if (!target) return;
    if (target.dataset.index === "0") target.focus();
    elements.current[target.name] = target;
  }, []);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setValues((state) => ({ ...state, [target.name]: target.value }));
  }

  function submit() {
    try {
      onSubmit(values);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  function handleKeyDown({
    key,
    currentTarget,
  }: React.KeyboardEvent<HTMLInputElement>) {
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
  }

  return (
    <div className="grid max-w-xl gap-2 p-4">
      <h1 className="text-2xl">Registro</h1>
      {fields.map(({ name, ...field }, index) => (
        <Input
          ref={handleRef}
          data-index={index}
          key={name}
          name={name}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={values[name]}
          {...field}
        />
      ))}

      {children({ onClick: submit })}
    </div>
  );
}