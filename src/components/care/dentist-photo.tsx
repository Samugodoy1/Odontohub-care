import { initialsOf } from "@/lib/catalog/names";

type DentistPhotoProps = {
  name: string;
  honorific?: string;
  photoUrl?: string | null;
  className?: string;
  compact?: boolean;
};

export function DentistPhoto({
  name,
  honorific,
  photoUrl,
  className = "",
  compact = false,
}: DentistPhotoProps) {
  const initials = initialsOf({ honorific, name });
  const label = [honorific, name].filter(Boolean).join(" ");

  if (photoUrl) {
    return (
      // External Hub/Google/Cloudinary URLs; native img keeps object-fit reliable.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={label}
        className={`h-full w-full object-cover object-top ${className}`}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`flex h-full w-full items-end justify-start bg-gradient-to-br from-[#d7e4ef] via-[#c5d5e4] to-[#9eb6c9] ${className}`}
    >
      <span
        className={`font-semibold tracking-tight text-white/90 ${
          compact ? "p-3 text-[22px]" : "p-6 text-[56px] sm:text-[72px]"
        }`}
      >
        {initials}
      </span>
    </div>
  );
}
