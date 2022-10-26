import { useState, useEffect, useRef, useCallback } from "react";

import { classNames } from "libraries/utils";

export default function Transition({
  show,
  children,
  className,
  transitionClassName,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  transitionClassName: string;
}) {
  const [element, setElement] = useState<HTMLDivElement>();
  const [transition, setTransition] = useState(false);
  const observer = useRef() as React.MutableRefObject<IntersectionObserver>;

  const handleRef = useCallback((target: HTMLDivElement) => {
    if (target) {
      setElement(target);
    }
  }, []);

  function handleTransitionEnd() {
    if (!show) {
      setTransition(false);
    }
  }

  useEffect(() => {
    observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        setTransition(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!element) return;

    const resizeObserver = observer.current;
    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [element]);

  if (!show && !transition) return null;

  return (
    <div
      ref={handleRef}
      className={classNames(
        "transition-all",
        className,
        show && transition && transitionClassName
      )}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {children}
    </div>
  );
}
