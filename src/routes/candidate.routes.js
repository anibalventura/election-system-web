import express from "express";
import * as candidateController from "../controllers/candidate.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const candidateRoutes = express.Router();
const basePath = "/candidates";

candidateRoutes.get(`${basePath}`, isAuth, candidateController.getIndex);

candidateRoutes.get(
  `${basePath}/create`,
  isAuth,
  candidateController.getCreate
);
candidateRoutes.post(
  `${basePath}/create`,
  isAuth,
  candidateController.postCreate
);

candidateRoutes.get(
  `${basePath}/edit/:candidateId`,
  isAuth,
  candidateController.getEdit
);
candidateRoutes.post(`${basePath}/edit`, candidateController.postEdit);

export default candidateRoutes;
