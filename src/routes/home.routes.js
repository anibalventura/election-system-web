import express from "express";
import * as homeController from "../controllers/home.controller.js";

const homeRoutes = express.Router();
const basePath = "/";

homeRoutes.get(`${basePath}`, homeController.getIndex);

export default homeRoutes;
