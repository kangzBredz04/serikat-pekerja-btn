import { pool } from "../config/db.js"
import multer from 'multer'

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = async (req, res) => {
    try {
        // console.log("File:", req.file);
        // console.log("Body:", req.body);
        const { originalname, mimetype, buffer } = req.file;
        const base64Image = buffer.toString("base64");
        const id = 1;

        const checkQuery = `SELECT * FROM organizational_structure WHERE id = $1`;
        const checkResult = await pool.query(checkQuery, [id]);

        let query, values;

        if (checkResult.rows.length > 0) {
            query = `UPDATE organizational_structure SET filename = $1, mimetype = $2, image_base64 = $3 WHERE id = $4 RETURNING *`;
            values = [originalname, mimetype, base64Image, id];
        } else {
            query = `INSERT INTO organizational_structure (id, filename, mimetype, image_base64) VALUES ($1, $2, $3, $4) RETURNING *`;
            values = [id, originalname, mimetype, base64Image];
        }

        const result = await pool.query(query, values);
        res.json({
            success: true,
            message: "Gambar berhasil disimpan!",
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload gagal!" });
    }
};

// TANPA DESKRIPSI
// export const getImage = async (req, res) => {
//     try {
//         // const { id } = req.params;
//         const query = `SELECT * FROM organizational_structure WHERE id = 1`;
//         const result = await pool.query(query);

//         if (result.rows.length === 0) {
//             return res.status(404).json({ success: false, message: "Gambar tidak ditemukan!" });
//         }

//         const image = result.rows[0];
//         const imgBuffer = Buffer.from(image.image_base64, "base64");

//         res.writeHead(200, {
//             "Content-Type": image.mimetype,
//             "Content-Length": imgBuffer.length,
//         });

//         res.end(imgBuffer);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Gagal mengambil gambar!" });
//     }
// }

// DENGAN DESKRIPSI
export const getImage = async (req, res) => {
    try {
        const query = `SELECT * FROM organizational_structure WHERE id = 1`;
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Gambar tidak ditemukan!" });
        }

        const image = result.rows[0];

        // Konversi gambar ke Base64
        const imageBase64 = image.image_base64;

        res.status(200).json({
            success: true,
            message: "Gambar berhasil diambil",
            data: {
                id: image.id,
                description: image.description, // Pastikan ada kolom 'description' di tabel
                mimetype: image.mimetype,
                image: `data:${image.mimetype};base64,${imageBase64}`
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil gambar!" });
    }
};
