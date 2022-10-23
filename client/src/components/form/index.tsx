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
  children: ({
    onClick,
    loading,
  }: {
    onClick: () => void;
    loading: boolean;
  }) => React.ReactNode;
  onSubmit: (props: Record<T[number]["name"], string>) => Promise<unknown>;
}) {
  const elements = useRef<Record<string, HTMLInputElement>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleRef = useCallback((target: HTMLInputElement) => {
    if (!target) return;
    if (target.dataset.index === "0") target.focus();
    elements.current[target.name] = target;
  }, []);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setValues((state) => ({ ...state, [target.name]: target.value }));
  }

  async function submit() {
    setLoading(true);
    try {
      const response = await onSubmit(values);
      console.log(response);
    } catch (error) {
      if (typeof error === "string") {
        console.log(error);
      }
    }
    setLoading(false);
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

      {children({ onClick: submit, loading })}
    </div>
  );
}
