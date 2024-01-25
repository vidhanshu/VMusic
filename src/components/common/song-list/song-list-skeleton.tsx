import { Skeleton } from "@nextui-org/react";

const SongListSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
      <Skeleton className="dark:bg-primary h-[50px] rounded-md" />
    </div>
  );
};

export default SongListSkeleton;
