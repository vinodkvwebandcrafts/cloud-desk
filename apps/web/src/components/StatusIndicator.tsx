"use client";

import { useSystemStatus } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

export function StatusIndicator() {
  const { t } = useLanguage();
  const { data: status, isLoading } = useSystemStatus();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
          {t.checkingStatus}
        </div>
      </div>
    );
  }

  const statusConfig = {
    operational: {
      dotColor: "bg-green-500",
      animation: "animate-[pulse-dot_2s_infinite]",
      text: t.allSystemsOperational,
      textColor: "text-green-600 dark:text-green-400",
    },
    degraded: {
      dotColor: "bg-yellow-500",
      animation: "animate-[pulse-dot-yellow_2s_infinite]",
      text: t.someSystemsDegraded,
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
    down: {
      dotColor: "bg-red-500",
      animation: "animate-[pulse-dot-red_2s_infinite]",
      text: t.systemOutage,
      textColor: "text-red-600 dark:text-red-400",
    },
  };

  const config = statusConfig[status?.status || "operational"];

  return (
    <div className="flex items-center justify-between" aria-live="polite">
      {/* Left: status badge pill */}
      <div className="flex items-center gap-3">
        <div className={clsx("flex items-center gap-2.5 px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5", 
          config.dotColor === "bg-green-500" ? "bg-green-50/80 border-green-200 dark:bg-green-900/20 dark:border-green-800" : 
          config.dotColor === "bg-yellow-500" ? "bg-yellow-50/80 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800" : 
          "bg-red-50/80 border-red-200 dark:bg-red-900/20 dark:border-red-800"
        )}>
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={clsx(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                config.dotColor,
                config.animation
              )}
            />
            <span
              className={clsx(
                "relative inline-flex h-2.5 w-2.5 rounded-full",
                config.dotColor
              )}
            />
          </span>
          <span className={clsx("text-sm font-semibold", config.textColor)}>
            {config.text}
          </span>
        </div>
      </div>

      {/* Right: link */}
      <a
        href="#"
        className="hidden md:flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
      >
        {t.viewStatusPage}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
