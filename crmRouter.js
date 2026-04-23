import express from "express";
import authenticate from "./middleware/authenticate.js";
import { ownerOnly } from "./middleware/role.js";

import CrmController from "./controller/crmController.js";

const crmRouter = express.Router()

crmRouter.get("/get", authenticate, ownerOnly, CrmController.customer)
crmRouter.get("/detail/:id", authenticate, ownerOnly, CrmController.detail)

export default crmRouter