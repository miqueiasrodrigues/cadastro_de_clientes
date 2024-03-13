import { Router, Request, Response } from "express";
import uploadConfig from "@config/upload";
import multer from "multer";
import ClientController from "src/app/http/controllers/ClientController";

const ClientRoutes = Router();
const clientController = new ClientController();
const upload = multer(uploadConfig);

ClientRoutes.get("/", clientController.index);

ClientRoutes.get("/:id", clientController.show);

ClientRoutes.post("/", upload.single("avatar"), clientController.store);

ClientRoutes.put("/:id", upload.single("avatar"), clientController.update);

ClientRoutes.delete("/:id", clientController.destroy);

export default ClientRoutes;
