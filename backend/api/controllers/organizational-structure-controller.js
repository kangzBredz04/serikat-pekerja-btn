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
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return res.status(400).send({ msg: "Image format not supported." });
    } else {
        const image = req.file.filename
        const id = 1

        console.log(image);

        try {
            const result = await pool.query(
                "UPDATE organizational_structure SET image_url = $1 WHERE id = $2 RETURNING *",
                [image, id]
            )
            res.status(200).json({
                msg: "Gambar berhasil di update",
                data: result.rows[0]
            });
        } catch (error) {
            res.status(500).send("error");
        }
    }
}

export const getImage = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM organizational_structure WHERE id = $1", [1]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}