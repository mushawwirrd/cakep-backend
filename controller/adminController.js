import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

import Admin from "../model/admin.js";


export default class AdminController {
    static async adminRegist(req, res) {
        try {
            let { username, email, password } = req.body
            password = bcrypt.hashSync(password, 5)

            const admin = await Admin.create({ username, email, password })

            return res.status(201).json({ message: "Berhasil terdaftar" })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Gagal terdaftar" })
        }
    }

    static async adminLogin(req, res) {
        try {
            const { username, password } = req.body

            const admin = await Admin.findOne({ where: { [Op.or]: [{ username: username }, { email: username }] } })

            if (!admin) return res.status(404).json({ message: "Pengguna tidak ditemukan" })

            const passMatch = await bcrypt.compare(password, admin.password)

            if (!passMatch) return res.status(403).json({ message: "Password salah" })

            const token = jwt.sign({ userId: admin.id, role: "admin" }, "secret", { expiresIn: "10h" })

            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                sameSite: "lax",
                maxAge: 10 * 60 * 60 * 1000
            })

            return res.status(200).json({ message: "Berhasil login" })

        } catch (error) {
            console.error(error)
            return res.status(500).json("Gagal Login")
        }

    }
}