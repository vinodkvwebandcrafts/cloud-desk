"use client";

import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { VideoSection } from "@/components/VideoSection";
import { StatusIndicator } from "@/components/StatusIndicator";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#0055D4] to-[#0041A3] text-white py-14 md:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {t.heroTitle}
            </h1>
            <p className="text-blue-100 mb-8 text-sm md:text-base">
              {t.heroSubtitle}
            </p>
            <SearchBar variant="hero" />
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="bg-white dark:bg-gray-900 py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#172B4D] dark:text-white mb-8 md:mb-12">
              {t.browseByCategory}
            </h2>
            <CategoryGrid />
          </div>
        </section>

        {/* Featured Articles */}
        <section id="featured" className="bg-[#F4F5F7] dark:bg-gray-800/50 py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#172B4D] dark:text-white mb-8 md:mb-12">
              {t.featuredArticles}
            </h2>
            <FeaturedArticles />
          </div>
        </section>

        {/* Videos */}
        <section id="videos" className="bg-white dark:bg-gray-900 py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#172B4D] dark:text-white mb-8 md:mb-12">
              {t.videoTutorials}
            </h2>
            <VideoSection />
          </div>
        </section>

        {/* Status */}
        <section id="status" className="bg-[#F4F5F7] dark:bg-gray-800/50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <StatusIndicator />
          </div>
        </section>

        <ChatWidget />
      </main>

      <Footer />
    </>
  );
}
