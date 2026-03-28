"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useSearch } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { Skeleton } from "./SkeletonLoader";
import clsx from "clsx";

interface SearchBarProps {
  variant?: "hero" | "header";
}

export function SearchBar({ variant = "hero" }: SearchBarProps) {
  const { t } = useLanguage();
  const chips = [
    { label: t.chipBilling, searchKey: "Billing" },
    { label: t.chipPasswordReset, searchKey: "Password" },
    { label: t.chipIntegrations, searchKey: "Integration" },
    { label: t.chipApiKeys, searchKey: "API" },
  ];
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeChip, setActiveChip] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading } = useSearch(debouncedQuery);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showDropdown = isFocused && debouncedQuery.length >= 1 && (isLoading || (results && results.length > 0));

  function handleChipClick(label: string, searchKey: string) {
    if (activeChip === label) {
      setActiveChip("");
      setQuery("");
      setDebouncedQuery("");
    } else {
      setActiveChip(label);
      setQuery(searchKey);
      setIsFocused(true);
    }
  }

  return (
    <div ref={containerRef} className={clsx("w-full", variant === "hero" ? "max-w-xl mx-auto" : "max-w-md")}>
      <div className="relative">
        {/* Search input with Search button */}
        <div
        className={clsx(
          "flex items-center rounded-full bg-white dark:bg-gray-800 overflow-hidden",
          isFocused ? "shadow-lg ring-2 ring-white/30" : "shadow-md border border-gray-200 dark:border-gray-700",
          variant === "hero" ? "h-[50px]" : "h-10"
        )}
      >
        <div className="flex items-center flex-1 px-3 md:px-4 gap-2 min-w-0">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder={t.searchPlaceholderHero}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 min-w-0 text-ellipsis"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setDebouncedQuery(""); }}
              className="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button className="h-full px-5 md:px-8 bg-[#0052CC] hover:bg-[#0041A3] text-white font-medium shrink-0 cursor-pointer transition-colors duration-200 rounded-r-full">
          {t.searchButton}
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            results?.map((article) => (
              <button
                key={article.id}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors cursor-pointer"
                onClick={() => setIsFocused(false)}
              >
                <div className="font-medium text-gray-900 dark:text-white text-sm">
                  {article.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {article.category.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {article.readTime} {t.minRead}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
      </div>

      {/* Chips */}
      {variant === "hero" && (
        <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mt-4 md:mt-6 justify-center text-xs md:text-sm">
          <span className="text-white/90 font-medium">{t.popular}</span>
          {chips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleChipClick(chip.label, chip.searchKey)}
              className={clsx(
                "px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
                activeChip === chip.label
                  ? "bg-white/25 text-white border border-white/40"
                  : "bg-[#256BDE]/30 text-white border border-white/20 hover:bg-white/20"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
