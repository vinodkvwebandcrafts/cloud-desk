import { Router } from "express";
import { prisma } from "@clouddesk/db";

export const categoriesRouter = Router();

// GET /api/categories?locale=en
categoriesRouter.get("/", async (req, res) => {
  try {
    const locale = (req.query.locale as string) || "en";

    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { articles: true } },
        translations: locale !== "en" ? { where: { locale } } : false,
      },
      orderBy: { name: "asc" },
    });

    // Overlay translations
    const result = categories.map((cat: any) => {
      const t = cat.translations?.[0];
      return {
        id: cat.id,
        name: t?.name || cat.name,
        description: t?.description || cat.description,
        icon: cat.icon,
        createdAt: cat.createdAt,
        _count: cat._count,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
