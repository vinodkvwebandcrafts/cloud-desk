import { Router } from "express";
import { prisma } from "@clouddesk/db";

export const articlesRouter = Router();

function overlayArticleTranslations(articles: any[], locale: string) {
  return articles.map((article: any) => {
    const t = article.translations?.[0];
    const catT = article.category?.translations?.[0];
    return {
      id: article.id,
      title: t?.title || article.title,
      slug: article.slug,
      content: t?.content || article.content,
      categoryId: article.categoryId,
      readTime: article.readTime,
      isFeatured: article.isFeatured,
      createdAt: article.createdAt,
      category: article.category
        ? {
            id: article.category.id,
            name: catT?.name || article.category.name,
            icon: article.category.icon,
          }
        : undefined,
    };
  });
}

// GET /api/articles?categoryId=&locale=en
articlesRouter.get("/articles", async (req, res) => {
  try {
    const { categoryId, locale: l } = req.query;
    const locale = (l as string) || "en";
    const where = categoryId ? { categoryId: categoryId as string } : {};

    const articles = await prisma.article.findMany({
      where,
      include: {
        category: {
          include: locale !== "en" ? { translations: { where: { locale } } } : {},
        },
        translations: locale !== "en" ? { where: { locale } } : false,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(overlayArticleTranslations(articles, locale));
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// GET /api/articles/search?q=&locale=en
articlesRouter.get("/articles/search", async (req, res) => {
  try {
    const q = (req.query.q as string) || "";
    const locale = (req.query.locale as string) || "en";

    if (q.length < 2) return res.json([]);

    // Always search English content + translated content for the locale
    const orConditions: any[] = [
      { title: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
    if (locale !== "en") {
      orConditions.push(
        { translations: { some: { locale, title: { contains: q, mode: "insensitive" } } } },
        { translations: { some: { locale, content: { contains: q, mode: "insensitive" } } } },
      );
    }
    const whereClause = { OR: orConditions };

    const articles = await prisma.article.findMany({
      where: whereClause,
      take: 5,
      include: {
        category: {
          include: locale !== "en" ? { translations: { where: { locale } } } : {},
        },
        translations: locale !== "en" ? { where: { locale } } : false,
      },
    });

    await prisma.searchLog.create({ data: { query: q } }).catch(() => {});

    res.json(overlayArticleTranslations(articles, locale));
  } catch (error) {
    console.error("Failed to search articles:", error);
    res.status(500).json({ error: "Failed to search articles" });
  }
});

// GET /api/featured?locale=en
articlesRouter.get("/featured", async (req, res) => {
  try {
    const locale = (req.query.locale as string) || "en";

    const featured = await prisma.article.findMany({
      where: { isFeatured: true },
      include: {
        category: {
          include: locale !== "en" ? { translations: { where: { locale } } } : {},
        },
        translations: locale !== "en" ? { where: { locale } } : false,
      },
    });

    res.json(overlayArticleTranslations(featured, locale));
  } catch (error) {
    console.error("Failed to fetch featured articles:", error);
    res.status(500).json({ error: "Failed to fetch featured articles" });
  }
});
