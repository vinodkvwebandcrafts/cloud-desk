"use client";

import { useState, useRef, useEffect } from "react";
import { useCategories } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { CategorySkeleton } from "./SkeletonLoader";
import { CategoryAccordion } from "./CategoryAccordion";
import { ChevronDown } from "lucide-react";
import { icons } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

function CategoryIcon({ name }: { name: string | null }) {
  if (!name) return null;
  const Icon: LucideIcon | undefined = (icons as Record<string, LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon className="w-5 h-5 text-current" />;
}

// Keyed by icon name (locale-independent)
const CATEGORY_COLORS: Record<string, { bg: string, text: string }> = {
  Rocket: { bg: "bg-blue-50 dark:bg-blue-900/40", text: "text-blue-600 dark:text-blue-400" },
  CreditCard: { bg: "bg-orange-50 dark:bg-orange-900/40", text: "text-orange-500 dark:text-orange-400" },
  Plug: { bg: "bg-pink-50 dark:bg-pink-900/40", text: "text-pink-500 dark:text-pink-400" },
  Shield: { bg: "bg-purple-50 dark:bg-purple-900/40", text: "text-purple-600 dark:text-purple-400" },
  Code: { bg: "bg-cyan-50 dark:bg-cyan-900/40", text: "text-cyan-600 dark:text-cyan-400" },
  Wrench: { bg: "bg-red-50 dark:bg-red-900/40", text: "text-red-500 dark:text-red-400" },
};

export function CategoryGrid() {
  const { t } = useLanguage();
  const { data: categories, isLoading } = useCategories();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [popoverPos, setPopoverPos] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Position dropdown to match the clicked card's width & horizontal position
  useEffect(() => {
    if (!expandedId) {
      setPopoverPos(null);
      return;
    }
    const card = cardRefs.current.get(expandedId);
    const grid = gridRef.current;
    if (!card || !grid) return;

    const cardRect = card.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();

    setPopoverPos({
      top: cardRect.bottom - gridRect.top + 6,
      left: cardRect.left - gridRect.left,
      width: cardRect.width,
    });
  }, [expandedId]);

  // Click-away to close
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setExpandedId(null);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div ref={gridRef} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => {
          const colors = CATEGORY_COLORS[category.icon || ""] || { bg: "bg-gray-100", text: "text-gray-600" };
          return (
          <button
            key={category.id}
            ref={(el) => {
              if (el) cardRefs.current.set(category.id, el);
            }}
            onClick={() =>
              setExpandedId(expandedId === category.id ? null : category.id)
            }
            aria-expanded={expandedId === category.id}
            className={clsx(
              "w-full text-left rounded-xl border p-5 group flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
              expandedId === category.id
                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 shadow-md"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300"
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", colors.bg, colors.text)}>
                <CategoryIcon name={category.icon} />
              </div>
              <div>
                <h3 className="font-bold text-[#172B4D] dark:text-white text-sm">
                  {category.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {category._count.articles} {t.articles}
                </span>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 w-full">
              {category.description}
            </p>
            <div className="flex justify-end w-full mt-3">
              <ChevronDown className={clsx("w-4 h-4 transition-transform", expandedId === category.id ? "rotate-180 text-blue-500" : "text-gray-300 group-hover:text-gray-400")} />
            </div>
          </button>
        )})}
      </div>

      {/* Dropdown — same width as the clicked card */}
      {expandedId && popoverPos && (
        <div
          className="absolute z-40 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden"
          style={{
            top: popoverPos.top,
            left: popoverPos.left,
            width: popoverPos.width,
          }}
        >
          <div className="border-b border-gray-100 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/80">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
              {categories?.find((c) => c.id === expandedId)?.name} Articles
            </h4>
          </div>
          <CategoryAccordion categoryId={expandedId} />
        </div>
      )}
    </div>
  );
}
