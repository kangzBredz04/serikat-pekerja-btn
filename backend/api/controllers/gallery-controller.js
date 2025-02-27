import multer from "multer"
import { pool } from "../config/db.js"

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const getAllGallery = async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM gallery")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const addImage = async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        const { description } = req.body;
        const base64Image = buffer.toString("base64");

        const query = `INSERT INTO images (filename, mimetype, image_base64, description) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [originalname, mimetype, base64Image, description];

        const result = await pool.query(query, values);
        res.json({
            success: true,
            message: "Gambar berhasil diunggah!",
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload gagal!", error: error.message });
    }
}