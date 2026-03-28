"use client";

import { useVideos } from "@/lib/hooks";
import { VideoSkeleton } from "./SkeletonLoader";
import { Play } from "lucide-react";

const VIDEO_GRADIENTS = [
  "from-blue-500 to-blue-700",
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-green-600",
  "from-amber-700 to-yellow-900",
];

export function VideoSection() {
  const { data: videos, isLoading } = useVideos();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <VideoSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) return null;

  const displayVideos = videos.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayVideos.map((video, index) => (
        <a
          key={video.id}
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block cursor-pointer"
        >
          {/* Rounded thumbnail with gradient */}
          <div
            className={`relative aspect-video rounded-2xl bg-gradient-to-br ${VIDEO_GRADIENTS[index % VIDEO_GRADIENTS.length]} flex items-center justify-center overflow-hidden mb-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </div>

          <h3 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <span className="text-xs text-gray-400 mt-0.5 block">
            {video.duration}
          </span>
        </a>
      ))}
    </div>
  );
}
