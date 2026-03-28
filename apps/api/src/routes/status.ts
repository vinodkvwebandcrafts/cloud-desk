import { Router } from "express";
import { prisma } from "@clouddesk/db";

export const statusRouter = Router();

// GET /api/system-status
statusRouter.get("/", async (_req, res) => {
  let dbStatus = "operational";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    dbStatus = "down";
  }

  const overallStatus = dbStatus === "operational" ? "operational" : "degraded";

  res.json({
    status: overallStatus,
    services: {
      database: dbStatus,
      api: "operational",
      support: "operational",
    },
    timestamp: new Date().toISOString(),
  });
});
