import express from "express";
import "dotenv/config";
import cors from "cors";

import NewRoute from "./routes/new-route.js";
import AuthRoute from "./routes/auth-route.js";
import GalleryRoute from "./routes/gallery-route.js";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "https://serikat-pekerja-btn.vercel.app"],
        credentials: true,
    })
);

app.use(express.json());

const router = express.Router();
app.use("/api", router);

router.use("/new", NewRoute);
router.use("/auth", AuthRoute);
router.use("/gallery", GalleryRoute);

router.get("/", (_req, res) => {
    res.status(200).json({ msg: "API berhasil dijalankan." });
});

app.listen(process.env.API_PORT, () =>
    console.log("Server berhasil dijalankan.")
);