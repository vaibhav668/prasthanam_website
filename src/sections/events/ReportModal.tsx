import type { Event } from "../../types/content";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/ui/Button";
import { sections } from "../../data/sections";

/** Report pop-up for one event/workshop: summary, highlights, PDF link. */
export function ReportModal({ event, onClose }: { event: Event | null; onClose: () => void }) {
  const copy = sections.events;
  const r = event?.report;
  return (
    <Modal open={!!event} onClose={onClose} label={event ? `${copy.reportTitle}: ${event.title}` : copy.reportTitle} className="sm:w-[min(92vw,640px)]">
      {event && r && (
        <div className="p-6 pt-14 sm:p-8 sm:pt-14">
          <p className="label">
            {copy.reportTitle} · {event.type}
            {r.pages ? ` · ${r.pages} ${copy.pages}` : ""}
          </p>
          <h3 className="h2 mt-3 text-[clamp(1.4rem,3.4vw,2.2rem)]">{event.title}</h3>
          {r.author && <p className="mono mt-2 text-xs uppercase tracking-[0.08em] text-mute">{r.author}</p>}
          {r.summary && <p className="mt-5 leading-relaxed text-paper/85">{r.summary}</p>}
          {r.highlights && r.highlights.length > 0 && (
            <>
              <p className="label mt-7">{copy.highlights}</p>
              <ul className="mt-3 border-t border-line">
                {r.highlights.map((h) => (
                  <li key={h} className="mono flex gap-3 border-b border-line py-2.5 text-sm text-paper">
                    <span aria-hidden className="text-red-text">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-8">
            {r.file ? (
              <Button href={r.file} variant="primary" icon="↗" external>
                {copy.openPdf}
              </Button>
            ) : (
              <p className="mono text-xs uppercase tracking-[0.1em] text-mute">{copy.noFile}</p>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
