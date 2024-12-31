import { Skeleton } from "@nextui-org/react";

export default function RewardListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(3)].map((_, index) => (
        <RewardItemSkeleton key={index} />
      ))}
    </div>
  );
}

function RewardItemSkeleton() {
  return (
    <div className="rounded-lg py-2 px-4 bg-stone-50">
      <div className="flex justify-between items-center">
        <Skeleton className="w-1/3 h-6 rounded-lg" />
        <Skeleton className="w-1/4 h-4 rounded-lg" />
        <div>
          <Skeleton className="w-16 h-6 rounded-lg" />
          <div className="w-20"></div>
        </div>
      </div>
    </div>
  );
}
