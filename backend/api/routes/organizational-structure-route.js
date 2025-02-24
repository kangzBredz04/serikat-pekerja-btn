import express from "express"
import { getImage, upload, uploadImage } from "../controllers/organizational-structure-controller.js";


const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);
router.get("/get-image-organizational-structure", getImage);

export default router;