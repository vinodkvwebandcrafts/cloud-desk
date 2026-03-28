"use client";

import { useFeatured } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { FeaturedSkeleton } from "./SkeletonLoader";
import { Clock, ArrowRight } from "lucide-react";

// Keyed by icon name (locale-independent)
const CATEGORY_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  CreditCard: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    bar: "bg-amber-500",
  },
  Shield: {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    text: "text-purple-700 dark:text-purple-400",
    bar: "bg-purple-500",
  },
  Code: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    bar: "bg-blue-500",
  },
  Plug: {
    bg: "bg-green-50 dark:bg-green-950/30",
    text: "text-green-700 dark:text-green-400",
    bar: "bg-green-500",
  },
  Rocket: {
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    text: "text-cyan-700 dark:text-cyan-400",
    bar: "bg-cyan-500",
  },
  Wrench: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    bar: "bg-red-500",
  },
};

const DEFAULT_COLOR = {
  bg: "bg-gray-50 dark:bg-gray-800",
  text: "text-gray-700 dark:text-gray-400",
  bar: "bg-gray-500",
};

export function FeaturedArticles() {
  const { t } = useLanguage();
  const { data: articles, isLoading } = useFeatured();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <FeaturedSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => {
        const color = CATEGORY_COLORS[article.category.icon || ""] || DEFAULT_COLOR;
        return (
          <article
            key={article.id}
            className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm"
          >
            <div className="p-6">
              {/* Category badge */}
              <span className={`cursor-pointer inline-block text-xs font-semibold px-2.5 py-1 rounded-md ${color.bg} ${color.text} uppercase tracking-wide mb-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}>
                {article.category.name}
              </span>

              <h3 className="font-semibold text-lg text-[#172B4D] dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2.5 line-clamp-3 leading-relaxed">
                {article.content.slice(0, 140)}...
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime} {t.minRead}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
