import express from "express";
import * as positionController from "../controllers/position.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const positionRoutes = express.Router();
const basePath = "/positions";

positionRoutes.get(`${basePath}`, isAuth, positionController.getIndex);

positionRoutes.get(`${basePath}/create`, isAuth, positionController.getCreate);
positionRoutes.post(
  `${basePath}/create`,
  isAuth,
  positionController.postCreate
);

positionRoutes.get(
  `${basePath}/edit/:positionId`,
  isAuth,
  positionController.getEdit
);
positionRoutes.post(`${basePath}/edit`, positionController.postEdit);

positionRoutes.get(
  `${basePath}/delete/:positionId`,
  isAuth,
  positionController.getDelete
);
positionRoutes.post(
  `${basePath}/delete`,
  isAuth,
  positionController.postDelete
);

export default positionRoutes;
