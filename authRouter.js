import express from "express"
import jwt from "jsonwebtoken"
import AdminController from "./controller/adminController.js"
import OwnerController from "./controller/ownerController.js"
import CustomerController from "./controller/customerController.js"

const authRouter = express.Router()

authRouter.post("/regist-admin", AdminController.adminRegist)
authRouter.post("/login-admin", AdminController.adminLogin)

authRouter.post("/regist-owner", OwnerController.ownerRegist)
authRouter.post("/login-owner", OwnerController.ownerLogin)

authRouter.post("/regist-customer", CustomerController.customerRegist)
authRouter.post("/login-customer", CustomerController.customerLogin)


authRouter.get("/check", (req, res) => {
    const token = req.cookies.token

    const decode = jwt.verify(token, "secret")

    return res.status(200).json({ message: "Token valid", userId: decode.userId, role: decode.role })
})

authRouter.post("/logout", (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "Berhasil logout" })
})

export default authRouter