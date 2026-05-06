import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Op } from "sequelize"

import Owner from "../model/owner.js"

export default class OwnerController {
    static async ownerRegist(req, res) {
        let { username, email, password } = req.body
        password = bcrypt.hashSync(password, 5)

        if(!username || !email || !password){
            return res.status(400).json({message: "Data tidak boleh kosong"})
        }

        const owner = await Owner.create({ username, email, password })

        return res.status(201).json({ message: "Selamat, anda berhasil terdaftar", data: owner })

    }

    static async ownerLogin(req, res) {
        const { username, password } = req.body

        const owner = await Owner.findOne({ where: { [Op.or]: [{ username: username }, { email: username }] } })

        if (!owner) return res.status(404).json({ message: "Pengguna tidak ditemukan" })

        const passMatch = await bcrypt.compare(password, owner.password)

        if (!passMatch) return res.status(403).json({ message: "Password yang anda masukan salah" })

        const token = jwt.sign({ userId: owner.id, role: "owner" }, "secret", { expiresIn: "10h" })

        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
            maxAge: 10 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Berhasil login" })
    }
}