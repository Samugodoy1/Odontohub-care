import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-[1080px] space-y-6">
        <Skeleton className="h-16 w-full rounded-[22px] bg-white/8" />
        <Skeleton className="h-12 w-2/3 rounded-2xl bg-white/8" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-72 rounded-[28px] bg-white/8" />
          <Skeleton className="h-72 rounded-[28px] bg-white/8" />
          <Skeleton className="h-72 rounded-[28px] bg-white/8" />
        </div>
      </div>
    </main>
  );
}
