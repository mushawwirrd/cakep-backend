import jwt from "jsonwebtoken"

export default function authenticate(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "Belum terautentikasi" })

    try {
        const decode = jwt.verify(token, "secret")
        req.userId = decode.userId
        req.role = decode.role
        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Token tidak valid" })
    }
}