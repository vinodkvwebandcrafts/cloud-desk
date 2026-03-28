"use client";

import { useState, useEffect, useRef } from "react";
import { Cloud, Search, X, Globe, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useSearch } from "@/lib/hooks";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES } from "@/lib/i18n";
import { Skeleton } from "./SkeletonLoader";
import clsx from "clsx";

export function Header() {
  const { locale, setLocale, t } = useLanguage();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [desktopSearchFocused, setDesktopSearchFocused] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading } = useSearch(debouncedQuery);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setDesktopSearchFocused(false);
      if (mobileSearchOpen && mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node) && !mobileToggleRef.current?.contains(e.target as Node)) closeMobileSearch();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (mobileSearchOpen) mobileInputRef.current?.focus();
  }, [mobileSearchOpen]);

  const hasResults = debouncedQuery.length >= 3 && (isLoading || (results && results.length > 0));
  const selectedLang = LANGUAGES.find((l) => l.code === locale);

  function closeMobileSearch() {
    setMobileSearchOpen(false);
    setQuery("");
    setDebouncedQuery("");
  }

  const searchResults = (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50">
      {isLoading ? (
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : (
        results?.map((article) => (
          <button key={article.id} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors cursor-pointer" onClick={closeMobileSearch}>
            <div className="font-medium text-gray-900 dark:text-white text-sm">{article.title}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">{article.category.name}</span>
              <span className="text-xs text-gray-400">{article.readTime} {t.minRead}</span>
            </div>
          </button>
        ))
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">CloudDesk</span>
          <span className="text-sm text-gray-400 dark:text-gray-500 hidden sm:inline">{t.helpCenter}</span>
        </div>

        <div ref={searchRef} className="hidden md:block flex-1 max-w-sm focus-within:max-w-2xl mx-auto relative transition-[max-width] duration-300 ease-in-out">
          <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus-within:border-blue-400 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all">
            <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
            <input type="text" placeholder={t.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setDesktopSearchFocused(true)} className="flex-1 py-1.5 px-2 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400" />
            {query && (
              <button onClick={() => { setQuery(""); setDebouncedQuery(""); }} className="text-gray-400 hover:text-gray-600 pr-2 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {desktopSearchFocused && hasResults && searchResults}
        </div>

        <div className="flex items-center gap-1">
          <button ref={mobileToggleRef} onClick={() => mobileSearchOpen ? closeMobileSearch() : setMobileSearchOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 cursor-pointer" aria-label={mobileSearchOpen ? "Close search" : "Open search"}>
            {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <div ref={langRef} className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm text-gray-600 dark:text-gray-300 cursor-pointer" aria-label="Change language">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{selectedLang?.label}</span>
              <ChevronDown className="w-3 h-3 hidden sm:block" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden z-50">
                {LANGUAGES.map((l) => (
                  <button key={l.code} onClick={() => { setLocale(l.code); setLangOpen(false); }} className={clsx("w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer", locale === l.code ? "text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/30" : "text-gray-700 dark:text-gray-300")}>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>

      {mobileSearchOpen && (
        <div ref={mobileSearchRef} className="md:hidden absolute top-full left-0 right-0 z-50 border-t border-gray-200 dark:border-gray-800 px-4 py-3 bg-white dark:bg-gray-900 shadow-lg">
          <div className="relative">
            <div className="flex items-center gap-2 rounded-lg border border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-gray-800">
              <Search className="w-4 h-4 text-gray-400 ml-3 shrink-0" />
              <input ref={mobileInputRef} type="text" placeholder={t.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 py-2.5 pr-3 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400" />
              {query && (
                <button onClick={() => { setQuery(""); setDebouncedQuery(""); }} className="text-gray-400 hover:text-gray-600 pr-3 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {hasResults && searchResults}
          </div>
        </div>
      )}
    </header>
  );
}
