import express from "express"
import { getAllNew } from "../controllers/new-controller.js";

const router = express.Router();

router.get("/get-all", getAllNew);

export default router;