/**
 * PHOTO LIBRARY
 *
 * Photos live in  src/assets/photos/<category>/<id>.<ext>
 *   categories:  projects · achievements · events · team · alumni
 *   <id>:        the item's `id` from its data file (src/data/*.ts)
 *   <ext>:       webp (best), avif, jpg, jpeg, png or svg
 *
 * Drop `member-01.webp` into src/assets/photos/team/ and the member with
 * id "member-01" gets that photo. No data-file edit needed. Vite optimises and
 * fingerprints the files at build time.
 *
 * An explicit `image` / `photo` in the data file always wins (use it for an
 * external URL or a file in /public).
 */

export type PhotoCategory = "projects" | "achievements" | "events" | "team" | "alumni";

const files = import.meta.glob("../assets/photos/*/*.{webp,avif,jpg,jpeg,png,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// "../assets/photos/team/member-01.webp" → "team/member-01"
const index = new Map<string, string>();
const EXT_ORDER = ["webp", "avif", "jpg", "jpeg", "png", "svg"];
const rank = (p: string) => EXT_ORDER.indexOf(p.split(".").pop()!.toLowerCase());
Object.entries(files)
  .sort(([a], [b]) => rank(a) - rank(b)) // prefer webp over png when both exist
  .forEach(([path, url]) => {
    const m = path.match(/photos\/([^/]+)\/(.+)\.[a-z]+$/i);
    if (m && !index.has(`${m[1]}/${m[2]}`)) index.set(`${m[1]}/${m[2]}`, url);
  });

/** URL of the photo for `<category>/<id>`, or undefined if no file was added. */
export function photoUrl(category: PhotoCategory, id: string): string | undefined {
  return index.get(`${category}/${id}`);
}

/**
 * Fills `item[key]` from the photo library when the data file didn't set it.
 * In dev it also warns about photos that don't match any id (usually a typo).
 */
export function withPhotos<T extends { id: string }, K extends keyof T>(category: PhotoCategory, items: T[], key: K): T[] {
  if (import.meta.env.DEV) {
    const ids = new Set(items.map((i) => i.id));
    index.forEach((_, k) => {
      const [cat, id] = k.split("/");
      if (cat === category && !ids.has(id)) {
        console.warn(`[photos] src/assets/photos/${cat}/${id}.* doesn't match any id in the ${cat} data. Known ids: ${[...ids].join(", ")}`);
      }
    });
  }
  return items.map((item) => {
    if (item[key]) return item;
    const url = photoUrl(category, item.id);
    return url ? { ...item, [key]: url } : item;
  });
}
