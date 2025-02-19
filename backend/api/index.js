import express from "express";
import "dotenv/config";

import NewRoute from "./routes/new-route.js"

const app = express();

app.use(express.json());

const router = express.Router();
app.use("/api", router);

router.use("/new", NewRoute);

router.get("/", (_req, res) => {
    res.status(200).json({ msg: "API berhasil dijalankan." });
});

app.listen(process.env.API_PORT, () =>
    console.log("Server berhasil dijalankan.")
);