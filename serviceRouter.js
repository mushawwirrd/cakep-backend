import express from "express"

import authenticate from "./middleware/authenticate.js"
import { adminOnly, ownerOnly } from "./middleware/role.js"

import ServiceController from "./controller/serviceController.js"
import upload from "./middleware/upload.js"

const serviceRouter = express.Router()

serviceRouter.post("/add", authenticate, upload.single("file"), ServiceController.addService)
serviceRouter.get("/get", ServiceController.getService)
serviceRouter.get("/get-one/:id", authenticate, ServiceController.oneService)
serviceRouter.put("/edit/:id", authenticate, upload.single("file"), ServiceController.editService)
serviceRouter.delete("/delete/:id", authenticate, ServiceController.dltService)


export default serviceRouter