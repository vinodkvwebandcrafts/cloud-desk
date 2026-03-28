"use client";

import clsx from "clsx";

interface SkeletonProps {
  variant?: "line" | "card" | "circle";
  className?: string;
}

export function Skeleton({ variant = "line", className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
        variant === "line" && "h-4 w-full",
        variant === "card" && "h-32 w-full rounded-xl",
        variant === "circle" && "h-10 w-10 rounded-full",
        className
      )}
    />
  );
}

export function CategorySkeleton() {
  return (
    <div className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800 flex flex-col h-[184px]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2 flex-1 w-full pt-1">
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="flex justify-end w-full mt-3">
        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm flex flex-col h-[280px]">
      <div className="p-6 flex flex-col h-full">
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-3 shrink-0" />
        <div className="space-y-3 shrink-0 mt-1">
          <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-2 mt-4 flex-1">
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="block">
      <div className="relative aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse mb-3 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />
      </div>
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
      <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-2" />
    </div>
  );
}
