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

export const getImages = async (_req, res) => {
    try {
        const query = `SELECT id, created_at, filename, mimetype, image_base64, description FROM images`;
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Tidak ada gambar ditemukan!" });
        }

        const images = result.rows.map(image => ({
            id: image.id,
            created_at: image.created_at,
            description: image.description,
            mimetype: image.mimetype,
            image: `data:${image.mimetype};base64,${image.image_base64}`
        }));

        res.status(200).json({ success: true, images });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil gambar!" });
    }
}


export const addImage = async (req, res) => {
    try {
        // Cek apakah file ada
        console.log("File:", req.file);
        console.log("Body:", req.body);


        // if (!req.file) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "File gambar tidak ditemukan!",
        //     });
        // }

        const { originalname, mimetype, buffer } = req.file; // File gambar
        const { description } = req.body; // Deskripsi gambar

        // Konversi buffer ke base64
        const base64Image = buffer.toString("base64");

        // Query untuk menyimpan ke database
        const query = `
      INSERT INTO images (filename, mimetype, image_base64, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
        const values = [originalname, mimetype, base64Image, description];

        // Eksekusi query
        const result = await pool.query(query, values);

        // Response sukses
        res.json({
            success: true,
            message: "Gambar berhasil diunggah!",
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Upload gagal!",
            error: error.message,
        });
    }
}