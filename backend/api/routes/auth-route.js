import express from "express"
import { deleteAccount, getAllAccount, loginAccount, logoutAccount } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/login", loginAccount);
router.get("/logout", logoutAccount);
router.get("/get-all", getAllAccount);
router.delete("/delete/:id", deleteAccount);

export default router;