import { pool } from "../config/db.js"
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const loginAccount = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Mencari data user berdasarkan username
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (result.rows.length > 0) {
            // Bandingkan password secara langsung
            if (result.rows[0].password === password) {
                const token = jwt.sign(result.rows[0], process.env.SECRET_KEY);
                // Set cookie
                res.cookie("token", token, {
                    httpOnly: true,
                });
                res.status(200).json({
                    data: result.rows[0],
                    token,
                    msg: "Login berhasil !!!",
                });
            } else {
                return res.status(401).json({ msg: "Password salah !!!" });
            }
        } else {
            return res.status(404).json({ msg: "User tidak ditemukan !!!" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const logoutAccount = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logout berhasil !!!" });
}

export const getAllAccount = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        if (req.params.id === "1") {
            res.status(200).json({
                msg: "Data admin utama tidak bisa dihapus.",
            });
        } else {
            await pool.query("DELETE FROM users WHERE id = $1", [req.params.id]);
            res.status(200).json({ msg: "User berhasil dihapus." });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const addAccount = async (req, res) => {
    const { full_name, username, email, password } = req.body;
    try {
        const hashPassword = await argon2.hash(password);
        const result = await pool.query(
            "INSERT INTO users (full_name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [full_name, username, email, hashPassword]
        );
        res.status(201).json({
            msg: "Pendaftaran akun melalui admin telah berhasil",
            data: result.rows[0],
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error });
    }
};