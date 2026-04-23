import express from "express"
import authenticate from "./middleware/authenticate.js"
import BookingController from "./controller/bookingController.js"
import { adminOnly } from "./middleware/role.js"

const bookingRouter = express.Router()

bookingRouter.post("/online", authenticate, BookingController.onlineBooking)
bookingRouter.post("/onsite", authenticate, BookingController.onsiteBooking)
bookingRouter.get("/get", authenticate, BookingController.getBooking)

export default bookingRouter
