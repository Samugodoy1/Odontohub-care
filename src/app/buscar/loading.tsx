import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-[820px] space-y-6">
        <Skeleton className="h-8 w-40 rounded-full" />
        <Skeleton className="h-12 w-2/3 rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-[28px]" />
        <Skeleton className="h-48 w-full rounded-[28px]" />
        <Skeleton className="h-48 w-full rounded-[28px]" />
      </div>
    </main>
  );
}
