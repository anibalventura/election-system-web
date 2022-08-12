import express from "express";
import * as partyController from "../controllers/party.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const partyRoutes = express.Router();
const basePath = "/admin/parties";

partyRoutes.get(`${basePath}`, isAuth, partyController.getIndex);

partyRoutes.get(`${basePath}/create`, isAuth, partyController.getCreate);
partyRoutes.post(`${basePath}/create`, isAuth, partyController.postCreate);

partyRoutes.get(`${basePath}/edit/:partyId`, isAuth, partyController.getEdit);
partyRoutes.post(`${basePath}/edit`, partyController.postEdit);

export default partyRoutes;
