import express from "express"
import authenticate from "./middleware/authenticate.js"
import { ownerOnly } from "./middleware/role.js"
import DashboardController from "./controller/dashboardController.js"

const dashboardRouter = express.Router()

dashboardRouter.get("/analyst", authenticate, ownerOnly, DashboardController.analytic)

export default dashboardRouter