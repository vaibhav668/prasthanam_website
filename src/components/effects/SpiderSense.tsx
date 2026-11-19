import type { ElementType, ComponentPropsWithoutRef } from "react";

/**
 * Spider-sense: a quick 200 ms red/cyan chromatic jitter on hover/focus/tap.
 * The effect itself is pure CSS (.ss in globals.css, transform + opacity only);
 * this wrapper just wires `data-text` so you don't forget it.
 *
 *   <SpiderSense as="a" href="#x" text="Read more" />
 */
type Props<T extends ElementType> = { as?: T; text: string; className?: string } & Omit<ComponentPropsWithoutRef<T>, "children">;

export function SpiderSense<T extends ElementType = "span">({ as, text, className = "", ...rest }: Props<T>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag className={`ss ${className}`} data-text={text} {...rest}>
      {text}
    </Tag>
  );
}

export const ssProps = (text: string) => ({ "data-text": text, className: "ss" });
