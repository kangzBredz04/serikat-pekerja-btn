import express from "express"
import { getAllNew, getNewById } from "../controllers/new-controller.js";

const router = express.Router();

router.get("/get-all", getAllNew);
router.get("/get-by-id/:id", getNewById);

export default router;