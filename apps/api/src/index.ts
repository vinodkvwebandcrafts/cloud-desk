import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

// Load .env from monorepo root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import cors from "cors";
import { categoriesRouter } from "./routes/categories";
import { articlesRouter } from "./routes/articles";
import { videosRouter } from "./routes/videos";
import { statusRouter } from "./routes/status";
import { chatRouter } from "./routes/chat";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api", articlesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/videos", videosRouter);
app.use("/api/system-status", statusRouter);
app.use("/api/chat", chatRouter);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});
