const HONORIFIC_RE = /^(dra?\.?)(?:\s+|$)/i;
const PARTICLE = new Set(["de", "da", "do", "das", "dos", "e", "del", "della"]);

export type ParsedDentistName = {
  honorific: "Dr." | "Dra." | "";
  name: string;
  givenName: string;
  displayName: string;
  shortName: string;
  initials: string;
};

function titleHonorific(raw: string): "Dr." | "Dra." | "" {
  const token = raw.replace(/\./g, "").toLowerCase();
  if (token === "dra") return "Dra.";
  if (token === "dr") return "Dr.";
  return "";
}

export function parseDentistName(raw: string | null | undefined): ParsedDentistName {
  const trimmed = String(raw || "").replace(/\s+/g, " ").trim();
  const match = trimmed.match(HONORIFIC_RE);
  const honorific = match ? titleHonorific(match[1]) : "";
  let name = (match ? trimmed.slice(match[0].length) : trimmed).trim();
  if (!name || /^(dra?\.?)$/i.test(name)) {
    name = "";
  }
  const givenName = name.split(" ").find(Boolean) || "";
  const displayName = name ? [honorific, name].filter(Boolean).join(" ") : "Dentista";
  const shortName = name ? [honorific, givenName].filter(Boolean).join(" ") : displayName;

  const initials = name
    .split(" ")
    .filter((part) => part.length > 1 && !PARTICLE.has(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return {
    honorific,
    name: name || "Dentista",
    givenName: givenName || name || "Dentista",
    displayName,
    shortName,
    initials: initials || (givenName[0]?.toUpperCase() ?? "D"),
  };
}

export function displayNameOf(professional: { honorific?: string; name: string }) {
  return parseDentistName([professional.honorific, professional.name].filter(Boolean).join(" ")).displayName;
}

export function shortNameOf(professional: { honorific?: string; name: string }) {
  return parseDentistName([professional.honorific, professional.name].filter(Boolean).join(" ")).shortName;
}

export function initialsOf(professional: { honorific?: string; name: string }) {
  return parseDentistName([professional.honorific, professional.name].filter(Boolean).join(" ")).initials;
}

export function hubDentistId(professionalId: string) {
  const match = professionalId.match(/^hub-(\d+)$/);
  return match ? match[1] : null;
}
