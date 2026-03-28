"use client";

import { useArticles } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { Skeleton } from "./SkeletonLoader";
import { Clock, FileText } from "lucide-react";

interface CategoryAccordionProps {
  categoryId: string;
}

export function CategoryAccordion({ categoryId }: CategoryAccordionProps) {
  const { t } = useLanguage();
  const { data: articles, isLoading } = useArticles(categoryId);

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400 text-sm">
        No articles in this category yet.
      </div>
    );
  }

  const visible = articles.slice(0, 6);
  const remaining = articles.length - visible.length;

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {visible.map((article) => (
        <button
          key={article.id}
          className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-start gap-3"
        >
          <FileText className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-900 dark:text-white">
              {article.title}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
            <Clock className="w-3 h-3" />
            {article.readTime} {t.minRead}
          </div>
        </button>
      ))}
      {remaining > 0 && (
        <div className="px-4 py-3 text-center">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
            {t.viewMore} ({remaining})
          </span>
        </div>
      )}
    </div>
  );
}
