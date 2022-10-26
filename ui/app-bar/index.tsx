export default function AppBar({
  children,
  buttons,
}: {
  children?: React.ReactNode;
  buttons?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between bg-neutral-900 py-1 px-2">
      {children}
      <div className="flex items-center">{buttons}</div>
    </header>
  );
}
