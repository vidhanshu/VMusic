import { Skeleton } from "@nextui-org/react";
import React from "react";

const SearchLoadingSkeleton = () => {
  return (
    <div className="py-6 space-y-4">
      <Skeleton className="h-[50px] rounded-md bg-primary" />
      <Skeleton className="h-[50px] rounded-md bg-primary" />
      <Skeleton className="h-[50px] rounded-md bg-primary" />
      <Skeleton className="h-[50px] rounded-md bg-primary" />
      <Skeleton className="h-[50px] rounded-md bg-primary" />
    </div>
  );
};

export default SearchLoadingSkeleton;
