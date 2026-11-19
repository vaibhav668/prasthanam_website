export const initials = (n: string) =>
  n
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Member photo, or initials on halftone when `photo` is missing. */
/** Works for members and alumni: anything with a name and optional photo. */
export function Avatar({ member, size, big }: { member: { name: string; photo?: string }; size: number; big?: boolean }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <span className="halftone flex h-full w-full items-center justify-center bg-ink-2">
      <span
        className="font-display font-extrabold leading-none text-paper/85"
        style={{ fontSize: Math.max(12, Math.round(size * (big ? 0.3 : 0.34))) }}
      >
        {initials(member.name)}
      </span>
    </span>
  );
}
