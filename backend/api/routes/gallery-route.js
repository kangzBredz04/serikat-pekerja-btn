import express from "express"
import { addImage, getImages, upload } from "../controllers/gallery-controller.js";

const router = express.Router();

router.get("/get-all", getImages);
router.post("/add-image", upload.single("image"), addImage);

export default router;