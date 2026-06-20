import express, { Application, Request, Response } from "express";
import cors from "cors";
import rolesRouter from "./routes/roles";

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response): void => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/roles", rolesRouter);

app.use((_req: Request, res: Response): void => {
  res.status(404).json({ error: "Not found" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
