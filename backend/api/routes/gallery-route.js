import express from "express"
import { addOrUpdateImage, getImages, upload } from "../controllers/gallery-controller.js";

const router = express.Router();

router.get("/get-all", getImages);
router.post("/add-image", upload.single("image"), addOrUpdateImage);
router.put("/update-image", upload.single("image"), addOrUpdateImage);

export default router;