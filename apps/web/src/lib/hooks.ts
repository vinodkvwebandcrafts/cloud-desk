"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { apiFetch } from "./api";
import { useLanguage } from "./language-context";
import type { Category, Article, Video, SystemStatus, ChatResponse } from "./types";

export function useCategories() {
  const { locale } = useLanguage();
  return useQuery<Category[]>({
    queryKey: ["categories", locale],
    queryFn: () => apiFetch(`/api/categories?locale=${locale}`),
  });
}

export function useArticles(categoryId: string | null) {
  const { locale } = useLanguage();
  return useQuery<Article[]>({
    queryKey: ["articles", categoryId, locale],
    queryFn: () => apiFetch(`/api/articles?categoryId=${categoryId}&locale=${locale}`),
    enabled: !!categoryId,
  });
}

export function useSearch(query: string) {
  const { locale } = useLanguage();
  return useQuery<Article[]>({
    queryKey: ["search", query, locale],
    queryFn: () => apiFetch(`/api/articles/search?q=${encodeURIComponent(query)}&locale=${locale}`),
    enabled: query.length >= 3,
  });
}

export function useFeatured() {
  const { locale } = useLanguage();
  return useQuery<Article[]>({
    queryKey: ["featured", locale],
    queryFn: () => apiFetch(`/api/featured?locale=${locale}`),
  });
}

export function useVideos() {
  const { locale } = useLanguage();
  return useQuery<Video[]>({
    queryKey: ["videos", locale],
    queryFn: () => apiFetch(`/api/videos?locale=${locale}`),
  });
}

export function useSystemStatus() {
  return useQuery<SystemStatus>({
    queryKey: ["status"],
    queryFn: () => apiFetch("/api/system-status"),
    refetchInterval: 30_000,
  });
}

export function useChatMutation() {
  return useMutation<ChatResponse, Error, string>({
    mutationFn: (message: string) =>
      apiFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }),
  });
}
