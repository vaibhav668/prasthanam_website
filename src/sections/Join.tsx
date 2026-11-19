import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { sections } from "../data/sections";
import { about } from "../data/about";
import { site } from "../config/site";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Button } from "../components/ui/Button";
import { GlitchFlash } from "../components/effects/GlitchTransition";
import { P8Svg } from "../components/three/P8Svg";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Field = "name" | "branch" | "year" | "interest" | "why";
type Values = Record<Field, string>;
const EMPTY: Values = { name: "", branch: "", year: "", interest: "", why: "" };

function validate(v: Values): Partial<Record<Field, string>> {
  const e = sections.join.errors;
  const out: Partial<Record<Field, string>> = {};
  if (v.name.trim().length < 2) out.name = e.name;
  if (!v.branch) out.branch = e.branch;
  if (!v.year) out.year = e.year;
  if (!v.interest) out.interest = e.interest;
  if (v.why.trim().length < 20) out.why = e.why;
  return out;
}

/** Send to the configured endpoint. No endpoint → demo mode (resolves after a beat). */
async function submit(values: Values) {
  const { endpoint, mode, googleFieldMap } = site.form;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  if (mode === "google-form") {
    const fd = new FormData();
    (Object.keys(values) as Field[]).forEach((k) => fd.append(googleFieldMap[k] ?? k, values[k]));
    // Google Forms doesn't send CORS headers; the request still lands.
    await fetch(endpoint, { method: "POST", mode: "no-cors", body: fd });
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...values, _subject: `New Prasthanam applicant: ${values.name}` }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

const inputCls =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-paper placeholder:text-mute/80 focus:border-cyan focus:outline-none focus:ring-0 aria-[invalid=true]:border-red";

export default function Join() {
  const copy = sections.join;
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [agent, setAgent] = useState("");
  const [flash, setFlash] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const interests = [...about.focusAreas.map((f) => f.name), ...copy.extraInterests];

  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched) setErrors(validate(next));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    try {
      await submit(values);
      setAgent(values.name.trim().split(/\s+/)[0]);
      if (!reduced) {
        setFlash(true);
        setTimeout(() => setFlash(false), 560);
      }
      setState("done");
      setValues(EMPTY);
      setTouched(false);
      setTimeout(() => successRef.current?.focus({ preventScroll: true }), 80);
    } catch {
      setState("error");
    }
  };

  const fieldProps = (k: Field) => ({
    id: `join-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `join-${k}-err` : undefined,
    required: true,
  });

  const Err = ({ k }: { k: Field }) =>
    errors[k] ? (
      <p id={`join-${k}-err`} className="mono mt-2 text-xs text-[#ff6b5e]">
        ! {errors[k]}
      </p>
    ) : null;

  const Label = ({ k, n }: { k: Field; n: number }) => (
    <label htmlFor={`join-${k}`} className="label flex gap-2">
      <span className="text-red-text">{String(n).padStart(2, "0")}</span>
      {copy.fields[k].label}
    </label>
  );

  return (
    <Section id="join" className="overflow-hidden border-t border-line">
      <div aria-hidden className="halftone-red pointer-events-none absolute -right-24 top-24 h-[420px] w-[420px] opacity-30 [mask-image:radial-gradient(closest-side,black,transparent)]" />
      <div className="wrap relative">
        <SectionHeader id="join" index={13} label={copy.label} title={copy.title} kicker={<p>{copy.kicker}</p>} />

        <div className="grid gap-12 md:grid-cols-12">
          <div className="hidden md:col-span-3 md:block">
            <div className="sticky top-16 w-[70%] max-w-[180px] overflow-hidden pt-16">
              <P8Svg className="w-full" />
            </div>
          </div>

          <div className="md:col-span-9 lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              {state === "done" ? (
                <m.div
                  key="ok"
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="border border-cyan/50 bg-ink-2 p-6 sm:p-10"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="mono text-[clamp(0.95rem,2.4vw,1.4rem)] font-semibold uppercase tracking-[0.06em] text-cyan">
                    {copy.successTitle} <span className="text-mute">//</span> <span className="normal-case text-paper">welcome, {agent}</span>
                  </p>
                  <p className="mt-4 max-w-[48ch] text-paper/80">{copy.successBody}</p>
                  {!site.form.endpoint && <p className="mono mt-4 text-xs text-mute">[ demo mode — set site.form.endpoint to receive submissions ]</p>}
                  <div className="mt-8">
                    <Button variant="ghost" onClick={() => setState("idle")}>
                      {copy.again}
                    </Button>
                  </div>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="sm:col-span-2">
                    <Label k="name" n={1} />
                    <input {...fieldProps("name")} type="text" autoComplete="name" placeholder={copy.fields.name.placeholder} className={inputCls} />
                    <Err k="name" />
                  </div>
                  <div>
                    <Label k="branch" n={2} />
                    <select {...fieldProps("branch")} className={`${inputCls} ${values.branch ? "" : "text-mute"}`}>
                      <option value="">{copy.fields.branch.placeholder}</option>
                      {copy.branches.map((b) => (
                        <option key={b} value={b} className="bg-ink text-paper">
                          {b}
                        </option>
                      ))}
                    </select>
                    <Err k="branch" />
                  </div>
                  <div>
                    <Label k="year" n={3} />
                    <select {...fieldProps("year")} className={`${inputCls} ${values.year ? "" : "text-mute"}`}>
                      <option value="">{copy.fields.year.placeholder}</option>
                      {copy.years.map((y) => (
                        <option key={y} value={y} className="bg-ink text-paper">
                          {y}
                        </option>
                      ))}
                    </select>
                    <Err k="year" />
                  </div>
                  <fieldset className="sm:col-span-2" aria-describedby={errors.interest ? "join-interest-err" : undefined}>
                    <legend className="label mb-3 flex gap-2">
                      <span className="text-red-text">04</span>
                      {copy.fields.interest.label}
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((it) => {
                        const checked = values.interest === it;
                        return (
                          <label
                            key={it}
                            className={`tap mono inline-flex cursor-pointer items-center border px-3 text-[12px] uppercase tracking-[0.08em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-cyan ${
                              checked ? "border-cyan bg-cyan/10 text-cyan" : "border-line text-paper/80 hover:border-paper/50"
                            }`}
                          >
                            <input type="radio" name="interest" value={it} checked={checked} onChange={set("interest")} className="sr-only" />
                            {it}
                          </label>
                        );
                      })}
                    </div>
                    <Err k="interest" />
                  </fieldset>
                  <div className="sm:col-span-2">
                    <Label k="why" n={5} />
                    <textarea {...fieldProps("why")} rows={4} placeholder={copy.fields.why.placeholder} className={`${inputCls} resize-y`} />
                    <div className="flex justify-between">
                      <Err k="why" />
                      <span className="mono ml-auto mt-2 text-xs text-mute">{values.why.trim().length}/20+</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                    <Button type="submit" variant="primary" icon="→" disabled={state === "sending"}>
                      {state === "sending" ? copy.sending : copy.submit}
                    </Button>
                    <p className="mono text-xs text-mute" aria-live="polite">
                      {state === "error" ? <span className="text-[#ff6b5e]">{copy.errors.network}</span> : site.email}
                    </p>
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <GlitchFlash show={flash} />
    </Section>
  );
}
