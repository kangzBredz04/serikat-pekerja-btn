import { pool } from "../config/db.js";

export const getAllNew = async (_req, res) => {
    try {
        const result = await pool.query("SELECT * FROM news");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getNewById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM news WHERE id = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createNew = async (req, res) => {
    const { title, image_url, content } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO news (title, image_url, content) VALUES ($1, $2, $3) RETURNING *",
            [title, image_url, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateNewById = async (req, res) => {
    const { title, image_url, content } = req.body;
    try {
        const result = await pool.query(
            "UPDATE news SET title = $1, image_url = $2, content = $3 WHERE id = $4 RETURNING *",
            [title, image_url, content, req.params.id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteNewById = async (req, res) => {
    try {
        await pool.query("DELETE FROM news WHERE id = $1", [req.params.id]);
        res.status(200).json({ msg: "Berita berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
