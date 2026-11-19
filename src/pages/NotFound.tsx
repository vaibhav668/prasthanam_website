import { Link } from "react-router-dom";
import { sections } from "../data/sections";
import { P8Svg } from "../components/three/P8Svg";

export default function NotFound() {
  const copy = sections.notFound;
  return (
    <section aria-labelledby="nf-title" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div aria-hidden className="gridpaper pointer-events-none absolute inset-0 opacity-50" />
      <div className="wrap relative grid items-center gap-10 pt-20 md:grid-cols-2">
        <div>
          <p className="label">[ {copy.code} ]</p>
          <h1 id="nf-title" className="display-xl mt-4 text-[clamp(3rem,12vw,8rem)]">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-[40ch] text-paper/80">{copy.body}</p>
          <Link to="/" className="ss tap mono mt-8 inline-flex items-center gap-3 bg-red-ui px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-paper" data-text={`${copy.cta} →`}>
            {copy.cta} →
          </Link>
        </div>
        <div className="mx-auto w-[60%] max-w-[300px] rotate-[24deg] md:w-full">
          <P8Svg className="w-full" animated />
        </div>
      </div>
    </section>
  );
}
