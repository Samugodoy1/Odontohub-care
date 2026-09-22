import { Badge } from "@/components/ui/badge";

export function NetworkBadge({ compact = false }: { compact?: boolean }) {
  return (
    <Badge
      variant="secondary"
      className="rounded-full border-0 bg-[#eaf3fb] px-2.5 py-0.5 text-[11px] font-medium text-[#0071e3]"
    >
      {compact ? "OdontoHub" : "Rede OdontoHub"}
    </Badge>
  );
}
