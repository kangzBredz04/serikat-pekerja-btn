import { pool } from "../config/db.js"
import multer from 'multer'

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./api/");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1]
        cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
    }
})

export const upload = multer({ storage: storage })

export const uploadImage = async (req, res) => {
    try {
        const { originalname, mimetype, buffer } = req.file;
        const base64Image = buffer.toString("base64");

        const query = `INSERT INTO organizational_structure (filename, mimetype, image_base64) VALUES ($1, $2, $3) RETURNING *`;
        const values = [originalname, mimetype, base64Image];

        const result = await pool.query(query, values);
        res.json({
            success: true,
            message: "Gambar berhasil diunggah!",
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload gagal!" });
    }
}

export const getImage = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM images WHERE id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Gambar tidak ditemukan!" });
        }

        const image = result.rows[0];
        const imgBuffer = Buffer.from(image.image_base64, "base64");

        res.writeHead(200, {
            "Content-Type": image.mimetype,
            "Content-Length": imgBuffer.length,
        });

        res.end(imgBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil gambar!" });
    }
}