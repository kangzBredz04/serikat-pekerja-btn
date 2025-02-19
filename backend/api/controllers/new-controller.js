import { pool } from "../config/db.js"

export const getAllNew = async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM news")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}