# Photo library

Every site photo that belongs to a data item lives here, one folder per section.
**The file name is the item's `id`.** No data-file editing needed.

```
src/assets/photos/
├── projects/        <project id>.webp        e.g. sample-line-follower.webp
├── achievements/    <achievement id>.webp    e.g. robowars-national-2025.webp
├── events/          <event id>.webp          e.g. sample-arduino-101.webp   (events AND workshops)
├── team/            <member id>.webp         e.g. member-01.webp
└── alumni/          <alumnus id>.webp        e.g. alum-1.webp
```

## How it works
1. Find the item's `id` in its data file (`src/data/projects.ts`, `team.ts`, `events.ts`, `achievements.ts`, `alumni.ts`).
2. Save the photo in the matching folder as `<id>.webp` (or `.avif` / `.jpg` / `.png`).
3. Save. The site picks it up. Items without a photo keep their placeholder (initials, drawn trophy, schematic).

If you save a photo whose name matches no `id`, the dev console prints a warning listing the valid ids.

To use a photo from somewhere else (a URL, or a file in `/public`), set `image:` / `photo:` in the data file. That overrides the library.

## Sizes (keeps the site fast)
| Folder | Shape | Size to export | Notes |
|---|---|---|---|
| `team/`, `alumni/` | Square, face centred | 600 × 600 | Shown in circles |
| `projects/` | 16:11 | 1280 × 880 | Card + modal |
| `achievements/` | 16:10 | 1280 × 800 | Opens full size on click |
| `events/` | 16:9 | 1280 × 720 | Shown at the top of the event card |

Keep each file under ~200 KB. Convert with `cwebp -q 78 in.jpg -o out.webp` or squoosh.app.

## Not in here
- **Gallery** photos: `public/images/gallery/` + `src/data/gallery.ts` (they need alt text and captions, so they're listed one by one).
- **Sponsor logos**: `public/images/sponsors/`.
- **Club logo / favicon / social image**: `public/`.
