import { Skeleton } from "@nextui-org/react";

const loading = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[40px] w-[40px] rounded-full bg-primary" />
      <Skeleton className="h-[250px] w-full rounded-md bg-primary" />
      <div className="space-y-8">
        <Skeleton className="h-[50px] w-full rounded-md bg-primary" />
        <Skeleton className="h-[50px] w-full rounded-md bg-primary" />
        <Skeleton className="h-[50px] w-full rounded-md bg-primary" />
        <Skeleton className="h-[50px] w-full rounded-md bg-primary" />
      </div>
    </div>
  );
};

export default loading;
