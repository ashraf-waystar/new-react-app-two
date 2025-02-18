import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { cartItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(Number(req.params.id));
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  });

  const httpServer = createServer(app);
  return httpServer;
}
