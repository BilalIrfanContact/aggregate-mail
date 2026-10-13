import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Box = { y: number; height: number; animate: boolean };

/**
 * A vertical list whose selection wash slides to the child marked `.active`
 * instead of jumping. `activeKey` names the current item, so only a change of
 * selection animates; layout shifts such as new counts move it instantly.
 */
export function SlidingNav({ activeKey, label, className, children }: {
  activeKey: string | null;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const nav = useRef<HTMLElement>(null);
  const lastKey = useRef(activeKey);
  const [box, setBox] = useState<Box | null>(null);
  useLayoutEffect(() => {
    const active = nav.current?.querySelector<HTMLElement>(":scope > .active");
    const moved = lastKey.current !== activeKey;
    lastKey.current = activeKey;
    if (!active) {
      setBox(null);
      return;
    }
    const y = active.offsetTop;
    const height = active.offsetHeight;
    setBox((current) =>
      current && current.y === y && current.height === height
        ? current
        : { y, height, animate: moved && current !== null });
  });
  return (
    <nav ref={nav} className={`sliding-nav${className ? ` ${className}` : ""}`} aria-label={label}>
      {box && (
        <span
          className={box.animate ? "sliding-wash animate" : "sliding-wash"}
          style={{ height: box.height, transform: `translateY(${box.y}px)` }}
          aria-hidden="true"
        />
      )}
      {children}
    </nav>
  );
}
