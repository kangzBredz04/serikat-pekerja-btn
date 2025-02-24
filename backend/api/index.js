import express from "express";
import "dotenv/config";
import cors from "cors";

import NewRoute from "./routes/new-route.js";
import AuthRoute from "./routes/auth-route.js";
import GalleryRoute from "./routes/gallery-route.js";
import OrganizationalStructureRoute from "./routes/organizational-structure-route.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/", express.static(path.join(__dirname, "/")))

router.use("/new", NewRoute);
router.use("/auth", AuthRoute);
router.use("/gallery", GalleryRoute);
router.use("/organizational-structure", OrganizationalStructureRoute);

router.get("/", (_req, res) => {
    res.status(200).json({ msg: "API berhasil dijalankan." });
});

app.listen(process.env.API_PORT, () =>
    console.log("Server berhasil dijalankan.")
);