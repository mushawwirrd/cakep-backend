import bcrypt from "bcrypt"
import { Op } from "sequelize"
import jwt from "jsonwebtoken"

import Customer from "../model/customer.js"


export default class CustomerController {
    static async customerRegist(req, res) {
        let { username, email, password, phone } = req.body
        password = bcrypt.hashSync(password, 5)

        const customer = await Customer.create({username, email, password, phone})

        return res.status(201).json({ message: "Berhasil terdaftar", data: customer })
    }

    static async customerLogin(req, res) {
        const { username, password } = req.body

        const customer = await Customer.findOne({ where: { [Op.or]: [{ username: username }, { email: username }] } })

        if (!customer) return res.status(404).json({ message: "Pengguna tidak ditemukan" })

        const passMatch = await bcrypt.compare(password, customer.password)

        if (!passMatch) return res.status(403).json({ message: "Password yang anda masukan salah" })

        const token = jwt.sign({ userId: customer.id, role: "customer" }, "secret", { expiresIn: "10h" })

        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
            maxAge: 10 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Berhasil login" })

    }
}