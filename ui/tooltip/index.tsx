import Transition from "ui/transition";
import { classNames } from "libraries/utils";

export default function Tooltip({
  children,
  show,
  content,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  show: boolean;
  content: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <span className={className}>
      {children}
      <Transition
        show={show}
        className="relative z-10 scale-50 opacity-0"
        transitionClassName="[&]:scale-100 [&]:opacity-100"
      >
        <div
          className={classNames(
            "absolute w-full rounded bg-zinc-900 p-4 shadow",
            contentClassName
          )}
        >
          {content}
        </div>
      </Transition>
    </span>
  );
}
