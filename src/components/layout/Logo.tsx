import { site } from "../../config/site";

/**
 * Club logo (gear-P + R mark). The file is a transparent, paper-coloured PNG
 * generated from the original artwork. Swap it by replacing public/images/logo*.png
 * (or point site.logo at another file).
 */
const RATIO = 421 / 354; // width / height of the artwork

export function LogoMark({ size = 52 }: { size?: number }) {
  const h = size;
  return (
    <img
      src={size > 20 ? site.logo.large : site.logo.small}
      alt=""
      aria-hidden="true"
      width={Math.round(h * RATIO)}
      height={h}
      decoding="async"
      className="block select-none"
      draggable={false}
    />
  );
}
