import { Badge } from "@/components/ui/badge";

export function NetworkBadge({ compact = false }: { compact?: boolean }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-full border-0 bg-[#eaf8ef] px-2.5 py-0.5 text-[11px] font-medium text-[#248a3d]"
    >
      {compact ? "OdontoHub" : "Rede OdontoHub"}
    </Badge>
  );
}
