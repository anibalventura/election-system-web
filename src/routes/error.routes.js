import express from "express";
import { get404 } from "../controllers/error.controller.js";

const errorRoutes = express.Router();

errorRoutes.use(get404);

export default errorRoutes;
