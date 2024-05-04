"use client";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

interface IImageLoadProgress {
  progress: number;
  name: string;
}
export const ImageLoadProgress: React.FC<IImageLoadProgress> = ({
  progress: initialProgress,
  name,
}: IImageLoadProgress) => {
  const [progress, setProgress] = React.useState(initialProgress);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="mb-1 flex items-center gap-2 ">
      <Icons.image className="h-10 w-10 text-gray-500" />
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{name}</p>
          <Button variant={"ghost"}>
            <Icons.cancel className="h-2 w-2" />
          </Button>
        </div>
        <Progress value={progress} className="w-full" />
        <p className="mt-2 text-xs font-light">${progress}% done</p>
      </div>
    </div>
  );
  //   return <Progress value={33} />;
};
