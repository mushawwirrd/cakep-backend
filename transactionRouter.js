import express from "express";
import authenticate from "./middleware/authenticate.js";
import { adminOnly } from "./middleware/role.js";
import TransactionController from "./controller/transactionController.js";

const transactionRouter = express.Router()

transactionRouter.post("/completed/:id", authenticate, TransactionController.completedBooking)


export default transactionRouter