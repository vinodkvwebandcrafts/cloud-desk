import { Router } from "express";
import { prisma } from "@clouddesk/db";

export const videosRouter = Router();

// GET /api/videos?locale=en
videosRouter.get("/", async (req, res) => {
  try {
    const locale = (req.query.locale as string) || "en";

    const videos = await prisma.video.findMany({
      include: {
        translations: locale !== "en" ? { where: { locale } } : false,
      },
      orderBy: { createdAt: "desc" },
    });

    const result = videos.map((video: any) => {
      const t = video.translations?.[0];
      return {
        id: video.id,
        title: t?.title || video.title,
        duration: video.duration,
        thumbnail: video.thumbnail,
        videoUrl: video.videoUrl,
        createdAt: video.createdAt,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});
