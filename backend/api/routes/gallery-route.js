import express from "express"
import { addImage, getImages } from "../controllers/gallery-controller.js";

const router = express.Router();

router.get("/get-all", getImages);
router.post("/add-image", addImage);

export default router;