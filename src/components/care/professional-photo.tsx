"use client";

import { useState } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export function ProfessionalPhoto({
  src,
  name,
  className = "",
}: {
  src?: string | null;
  name: string;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/85 font-semibold text-[#1d1d1f] ${className}`}
    >
      {src && failedSrc !== src ? (
        // Profile images can come from Cloudinary or a Google account.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`Foto de ${name}`}
          className="size-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </div>
  );
}
