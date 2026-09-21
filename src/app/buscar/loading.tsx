import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <main className="py-10 sm:py-16">
      <div className="care-align space-y-6">
        <Skeleton className="h-16 w-full rounded-[22px]" />
        <Skeleton className="h-12 w-2/3 rounded-2xl" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-72 rounded-[28px]" />
          <Skeleton className="h-72 rounded-[28px]" />
          <Skeleton className="h-72 rounded-[28px]" />
        </div>
      </div>
    </main>
  );
}
