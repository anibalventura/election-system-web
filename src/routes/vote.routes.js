import express from "express";
import * as voteController from "../controllers/vote.controller.js";
import { isVote } from "../middleware/vote.middleware.js";

const voteRoutes = express.Router();
const basePath = "/home/vote";

voteRoutes.get(`${basePath}`, isVote, voteController.getIndex);
voteRoutes.post(`${basePath}/finish`, isVote, voteController.postFinish);

export default voteRoutes;
