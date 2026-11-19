/**
 * REPORT PDF LIBRARY
 *
 * Put a report PDF in  src/assets/reports/<event id>.pdf  and the event with that id
 * gets a "Report" button linking to it. No data-file edit needed.
 * (To link a report that lives elsewhere, e.g. Google Drive, set `report.file` in the event.)
 */
const files = import.meta.glob("../assets/reports/*.{pdf,PDF}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

const index = new Map<string, string>();
Object.entries(files).forEach(([path, url]) => {
  const m = path.match(/reports\/(.+)\.pdf$/i);
  if (m) index.set(m[1], url);
});

export const reportPdf = (eventId: string) => index.get(eventId);

/** In dev, warn about PDFs whose name matches no event id (usually a typo). */
export function warnOrphanReports(ids: string[]) {
  if (!import.meta.env.DEV) return;
  index.forEach((_, id) => {
    if (!ids.includes(id)) console.warn(`[reports] src/assets/reports/${id}.pdf doesn't match any event id. Known ids: ${ids.join(", ")}`);
  });
}
