import express from "express";
import * as homeController from "../controllers/home.controller.js";
import { isVote } from "../middleware/vote.middleware.js";

const homeRoutes = express.Router();
const basePath = "/";

homeRoutes.get(`${basePath}`, isVote, homeController.getIndex);
homeRoutes.post(`${basePath}home/vote`, isVote, homeController.postVote);

export default homeRoutes;
