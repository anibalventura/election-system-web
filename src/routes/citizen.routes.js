import express from "express";
import * as citizenController from "../controllers/citizen.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const citizenRoutes = express.Router();
const basePath = "/citizens";

citizenRoutes.get(`${basePath}`, isAuth, citizenController.getIndex);

citizenRoutes.get(`${basePath}/create`, isAuth, citizenController.getCreate);
citizenRoutes.post(`${basePath}/create`, isAuth, citizenController.postCreate);

citizenRoutes.get(
  `${basePath}/edit/:citizenId`,
  isAuth,
  citizenController.getEdit
);
citizenRoutes.post(`${basePath}/edit`, citizenController.postEdit);

citizenRoutes.get(
  `${basePath}/delete/:citizenId`,
  isAuth,
  citizenController.getDelete
);
citizenRoutes.post(`${basePath}/delete`, isAuth, citizenController.postDelete);

export default citizenRoutes;
