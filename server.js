import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

import authRouter from "./authRouter.js"
import serviceRouter from "./serviceRouter.js"
import bookingRouter from "./bookingRouter.js"
import transactionRouter from "./transactionRouter.js"
import crmRouter from "./crmRouter.js"
import dashboardRouter from "./dashboardRouter.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/auth", authRouter)
app.use("/service", serviceRouter)
app.use("/booking", bookingRouter)
app.use("/transaction", transactionRouter)
app.use("/crm", crmRouter)
app.use("/dashboard", dashboardRouter)

app.use("/uploads", express.static("uploads"))

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`))

