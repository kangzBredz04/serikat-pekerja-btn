import express from "express"
import { deleteNewById, getAllNew, getNewById, updateNewById } from "../controllers/new-controller.js";

const router = express.Router();

router.get("/get-all", getAllNew);
router.get("/get-by-id/:id", getNewById);
router.put("/update-by-id/:id", updateNewById);
router.delete("/delete-by-id/:id", deleteNewById);

export default router;