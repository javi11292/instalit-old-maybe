export function classNames(...names: (string | false | undefined)[]) {
  return names.reduce<string>((acc, name) => {
    if (name && !acc) return name;
    if (name) return `${acc} ${name}`;
    return acc;
  }, "");
}
