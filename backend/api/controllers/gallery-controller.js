import { pool } from "../config/db.js"

export const getAllGallery = async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM gallery")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}