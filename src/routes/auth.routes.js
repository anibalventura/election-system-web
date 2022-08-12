import express from "express";
import * as authController from "../controllers/auth.controller.js";

const authRoutes = express.Router();
const basePath = "/home/auth";

authRoutes.get(`${basePath}/login`, authController.getLogin);
authRoutes.post(`${basePath}/login`, authController.postLogin);

authRoutes.get(`${basePath}/register`, authController.getRegister);
authRoutes.post(`${basePath}/register`, authController.postRegister);

authRoutes.post(`${basePath}/logout`, authController.postLogout);

export default authRoutes;
