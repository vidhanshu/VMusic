import React from "react";
import { Skeleton } from "@nextui-org/react";

const SearchLoadingSkeleton = () => {
  return (
    <div className="py-6 space-y-4">
      <Skeleton className="h-[50px] rounded-md dark:bg-primary" />
      <Skeleton className="h-[50px] rounded-md dark:bg-primary" />
      <Skeleton className="h-[50px] rounded-md dark:bg-primary" />
      <Skeleton className="h-[50px] rounded-md dark:bg-primary" />
      <Skeleton className="h-[50px] rounded-md dark:bg-primary" />
    </div>
  );
};

export default SearchLoadingSkeleton;
