import { Router } from "express";
import express from "express";
import ClientRoutes from "./client-routes";
import path from "path";

const routes = Router();

routes.use("/client", ClientRoutes);

routes.use(
  "/images",
  express.static(path.join(__dirname, "..", "..", "public", "images"))
);

export default routes;
