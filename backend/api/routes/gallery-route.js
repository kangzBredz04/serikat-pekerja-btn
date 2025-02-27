import express from "express"
import { addImage, getAllGallery } from "../controllers/gallery-controller.js";

const router = express.Router();

router.get("/get-all", getAllGallery);
router.post("/add-image", addImage);

export default router;