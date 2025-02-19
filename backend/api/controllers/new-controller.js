import { pool } from "../config/db.js"

export const getAllNew = async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM news")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getNewById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM news WHERE id = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}