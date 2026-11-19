/** Shown when a data array is empty. */
export function EmptyState({ message, children }: { message: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-4 border border-dashed border-line p-8">
      <p className="label">[ NULL / 0 RECORDS ]</p>
      <p className="max-w-[48ch] text-paper/80">{message}</p>
      {children}
    </div>
  );
}
