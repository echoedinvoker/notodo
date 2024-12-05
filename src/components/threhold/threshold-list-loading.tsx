import { Skeleton } from "@nextui-org/react";

export default function ThresholdListLoading() {
  const loadingItems = Array(5).fill(null);

  return (
    <div className="flex flex-col gap-2">
      {loadingItems.map((_, index) => (
        <div key={index} className="rounded-lg py-2 px-4 shadow hover:shadow-md transition duration-300 bg-stone-50">
          <div className="flex justify-between items-center">
            <Skeleton className="w-3/4 h-6 rounded-lg" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-4 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
