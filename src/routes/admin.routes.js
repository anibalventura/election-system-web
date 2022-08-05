import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const homeRoutes = express.Router();
const basePath = "/admin";

homeRoutes.get(`${basePath}`, isAuth, adminController.getIndex);

export default homeRoutes;
