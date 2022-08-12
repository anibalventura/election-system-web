import express from "express";
import * as homeController from "../controllers/home.controller.js";
import { isVote } from "../middleware/vote.middleware.js";

const homeRoutes = express.Router();
const basePath = "/";

homeRoutes.get(`${basePath}`, isVote, homeController.getIndex);
homeRoutes.post(`${basePath}home/citizen`, isVote, homeController.postCitizen);

export default homeRoutes;
