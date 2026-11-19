# Prasthanam — Robotics Club Website (GBPIET)

> प्रस्थानम् — the departure. Where ideas leave the notebook and start walking.

Frontend-only site for **Prasthanam**, the robotics club of G.B. Pant Institute of
Engineering & Technology, Ghurdauri, Pauri Garhwal. Theme: **THE WEB**. The mascot is
**P-8**, an original eight-legged spider robot.

Stack: React 18 · Vite · TypeScript · Tailwind CSS · Framer Motion · Lenis ·
React Three Fiber (one hero canvas only) · React Router.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
```

---

## 1. Editing content (no component changes needed)

**All text and lists live in `src/data/`.** Each file starts with a comment explaining
every field. Sections read only from their data file and show an empty state if the
array is empty. To add a member, project or event, edit the data file and nothing else.

| File | What it controls |
|---|---|
| `src/config/site.ts` | Club name, tagline, address, email, socials, **form endpoint**, feature flags, nav links, 3D model path |
| `src/data/hero.ts` | Hero title, Sanskrit line, subline, CTAs, marquee words, boot-intro status lines |
| `src/data/about.ts` | Mission paragraphs, stat counters, focus areas |
| `src/data/projects.ts` | Projects (`verse` picks the card style: `blueprint` / `comic` / `crt` / `thermal`) |
| `src/data/team.ts` | Members, shown as nodes on a rotating web with a detail card (`tier`: `faculty` / `core` / `lead` / `member`; order around the ring follows tier; core gets red rings + a CLEARANCE ribbon) |
| `src/data/events.ts` | Events (`status`: `upcoming` / `past`; `date`: ISO `"2026-02-14"` or `"TBA"`) |
| `src/data/achievements.ts` | Trophy log |
| `src/data/reports.ts` | Reports (PDFs go in `public/reports/`, or link any public URL; `type`: `event` / `workshop` / `technical` / `annual`) |
| `src/data/updates.ts` | News / announcements feed (`pinned: true` keeps one on top; `tag`: `announcement` / `recruitment` / `result` / `general`) |
| `src/data/alumni.ts` | Alumni, grouped by `batch` (e.g. `"2020–2024"`); photos in `public/images/alumni/` |
| `src/data/gallery.ts` | Gallery images (always give `alt`; give `width`/`height` to avoid layout shift) |
| `src/data/sponsors.ts` | Sponsors (empty array → "sponsor us" empty state) |
| `src/data/faq.ts` | FAQ accordion |
| `src/data/terminal.ts` | Easter-egg terminal commands |
| `src/data/sections.ts` | Section headings, labels, empty-state messages, Join form options and error text, 404 copy |

Types for all of the above are in `src/types/content.ts`. TypeScript will flag a
missing or misspelled field when you run `npm run dev` or `npm run build`.

> All shipped content is **SAMPLE placeholder data** ("Member Name", "Date TBA", etc.).
> Replace it with real information. Don't list people without their consent, and don't
> list achievements the club hasn't earned.

### Examples

Add a project (`src/data/projects.ts`):

```ts
{
  id: "line-follower-v3",
  title: "Line Follower v3",
  tagline: "Reads a 2 cm track at 1.4 m/s.",
  description: "Longer write-up shown in the modal…",
  year: 2026,
  status: "completed",          // completed | ongoing | prototype
  verse: "blueprint",           // blueprint | comic | crt | thermal
  tech: ["STM32", "PID"],
  specs: [{ label: "MCU", value: "STM32F103" }],
  image: "/images/projects/line-follower-v3.webp", // optional
  github: "https://github.com/…",                   // optional
  team: ["member-03"],                              // ids from team.ts (optional)
},
```

Add a member (`src/data/team.ts`):

```ts
{ id: "member-10", name: "Full Name", role: "Mechanical Lead", branch: "ME",
  year: "3rd Year", tier: "lead", photo: "/images/team/member-10.webp",
  skills: ["SolidWorks"], socials: { linkedin: "https://linkedin.com/in/…" } },
```

## 2. Adding photos

Put files in `public/images/…` and reference them as `/images/…`.

| Kind | Folder | Recommended |
|---|---|---|
| Team | `public/images/team/` | Square, ≥ 400×400, WebP/AVIF, face centred (shown in circles) |
| Projects | `public/images/projects/` | 16:11, ~1280 px wide, WebP/AVIF |
| Gallery | `public/images/gallery/` | Any ratio, ~1600 px long edge, WebP/AVIF |
| Sponsors | `public/images/sponsors/` | SVG or transparent PNG, light/monochrome |

Convert to WebP: `cwebp -q 78 in.jpg -o out.webp` (or squoosh.app).
For responsive gallery images, export two sizes and set
`srcSet: "/images/gallery/lab-640.webp 640w, /images/gallery/lab-1280.webp 1280w"`.
Always set `width` and `height` on gallery items to reserve space and prevent layout shift.

The current gallery and sponsor images are placeholder SVGs marked **SAMPLE / REPLACE ME**.
**Logo:** the navbar/footer logo is `public/images/logo-64.png` and `logo-128.png` (paths set in
`site.logo`), a transparent paper-coloured version of the original artwork. The browser tab icon is
`public/favicon.png` and `public/apple-touch-icon.png`. To change the logo, replace those files and
update `RATIO` (width / height) in `src/components/layout/Logo.tsx`.

Also replace `public/og-image.png` (1200×630 social-share image) if you change the hero.

## 3. Changing colours

The palette lives at the top of `src/styles/globals.css`:

```css
--ink: #0b0b0c;  --ink-2: #141416;  --paper: #ede8de;  --mute: #8d887f;
--red: #e10600;  --cyan: #00e5ff;   --line: rgba(237,232,222,.14);
```

Each colour also has an `*-rgb` twin (e.g. `--red-rgb: 225 6 0`). Tailwind uses these
so classes like `bg-red/70` work, so **update both values together**.

Two accessibility helpers:
- `--red-ui` (`#c80600`): filled red buttons and badges carrying small text (meets 4.5:1).
- `--red-text` (`#ff3b30`): small red text on the dark background.

`--red` stays the brand accent for large type, dots, lines and the marquee.
Use cyan only for interactive accents.

Fonts (Unbounded / Archivo / JetBrains Mono) load from Google Fonts in `index.html`.
`globals.css` defines metric-matched fallback faces so the font swap doesn't shift layout.
If you change a font, update or remove its `… Fallback` `@font-face`.

## 4. Join form endpoint

Edit `site.form` in `src/config/site.ts`:

- **Formspree (recommended):** create a form at formspree.io and set
  `endpoint: "https://formspree.io/f/xxxxxxx"`, `mode: "json"`. Any endpoint that
  accepts a JSON POST works the same way (Getform, Basin, a serverless function…).
- **Google Forms:** set `mode: "google-form"` and
  `endpoint: "https://docs.google.com/forms/d/e/<FORM_ID>/formResponse"`, then map each
  field to its `entry.XXXXXXX` id in `googleFieldMap` (use the form's "Get pre-filled
  link" to find them). Google doesn't send CORS headers, so the site can't read the
  response; it assumes success.
- **Empty endpoint (`""`):** demo mode. No request is sent, but the success state still
  shows, with a note.

Fields sent: `name`, `branch`, `year`, `interest`, `why`. Validation runs client-side.

## 5. Swapping in the real 3D model

P-8 is currently built from primitives in `src/components/three/SpiderBot.tsx`, so it
works without any model file. Once a Blender model exists:

1. Export it as **glTF binary with Draco compression**, under 1.5 MB and under 20k triangles.
   Put the origin at the thread attachment point (top of the abdomen), Y up, eye facing +Z,
   about 2.5 units wide including legs. Name the lens object **`Eye`** so it tracks the cursor.
2. Save it as `public/models/p8.glb`.
3. Make the one-line change in `src/config/site.ts`:

   ```ts
   modelUrl: "/models/p8.glb",
   ```

The loader (`GltfBot.tsx`) is code-split, so drei and the GLTF/Draco loaders only
download when a model is set. Draco decoding uses drei's default decoder CDN.

## 6. Feature flags (`site.features`)

| Flag | Effect |
|---|---|
| `threeHero` | `false` = always use the SVG P-8 (no WebGL at all) |
| `bootIntro` | First-visit assembly intro (≤ 1.35 s, skippable, reduced motion skips it) |
| `webShooter` | Click/tap empty hero space to fire a web strand |
| `terminal` | `` ` `` / `~` / `>_` easter-egg terminal |
| `xray` | Blueprint/wireframe toggle in the navbar |
| `smoothScroll` | Lenis smooth scroll (desktop only; never on touch) |

## 7. Performance notes

- **One WebGL canvas** (the hero), lazy-loaded after first paint and idle, only on
  desktop-class devices (≥ 900 px wide, fine pointer, ≥ 4 cores / 4 GB, WebGL available,
  no reduced-motion or Save-Data).
- Phones, tablets and low-end machines get an animated **SVG P-8** with the same look
  and behaviour (swing, eye tracking, scroll drop, web shots) using CSS transforms only.
  Force either tier for testing with `?tier=low` or `?tier=high`.
- The canvas stops rendering (`frameloop="never"`) when the hero is off-screen or the tab is hidden.
- Below-the-fold sections are code-split and mounted one per idle slot.
  Any scroll, key press or nav click mounts the rest immediately.
- Initial JS ≈ 100 KB gzipped (React + app). The 3D chunk (~220 KB gz) loads only on desktop.
- Lighthouse (local production build): mobile 99 / 100 / 100 / 100,
  desktop 100 / 100 / 100 / 100. Mobile LCP ≈ 2.0 s, CLS ≈ 0.001, TBT ≈ 20–40 ms.

## 8. Deploying

**Vercel:** import the repo. Framework preset "Vite", build `npm run build`,
output `dist`. `vercel.json` already rewrites unknown routes to `index.html`
so the 404 page works.

**Netlify:** import the repo. `netlify.toml` already sets the build command,
`dist` publish directory and SPA redirect.

After deploying, replace `https://prasthanam.example/` in `index.html` (canonical URL),
`public/robots.txt` and `public/sitemap.xml` with the real domain.

## Project structure

```
src/
  config/site.ts        global config + feature flags
  data/                 ALL editable content
  types/content.ts      interfaces for every data file
  components/
    layout/             Navbar, MobileMenu, Footer, Section, SectionHeader, Grain, Logo
    ui/                 Button, Tag, Card, Badge, Modal, Counter, EmptyState, Annotation
    three/              HeroScene, SpiderBot, WebStrands, GltfBot, SceneFallback, P8Svg
    effects/            WebShot, SpiderSense, GlitchTransition, Terminal, BootIntro
  sections/             Hero, Marquee, About, Projects, Team, Events, Achievements,
                        Gallery, Sponsors, FAQ, Join
  hooks/                useDeviceTier, useReducedMotion, useInView, usePointer
  pages/                Home, NotFound
  lib/                  scroll helpers, P-8 shared state, UI event bus
  styles/globals.css    tokens, textures, effects, verse styles, x-ray, reduced motion
public/
  images/               grain texture, sample gallery/sponsor placeholders
  models/               put p8.glb here
```

Built by Prasthanam.
