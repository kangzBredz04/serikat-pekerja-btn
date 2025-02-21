import express from "express"
import { getAllGallery } from "../controllers/gallery-controller.js";

const router = express.Router();

router.get("/get-all", getAllGallery);

export default router;