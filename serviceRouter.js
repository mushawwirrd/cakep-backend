import express from "express"

import authenticate from "./middleware/authenticate.js"
import { adminOnly } from "./middleware/role.js"

import ServiceController from "./controller/serviceController.js"

const serviceRouter = express.Router()

serviceRouter.post("/add", authenticate, adminOnly, ServiceController.addService)
serviceRouter.get("/get", authenticate, ServiceController.getService)

export default serviceRouter