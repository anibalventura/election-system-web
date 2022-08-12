import express from "express";
import * as electionController from "../controllers/election.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const electionRoutes = express.Router();
const basePath = "/admin/elections";

electionRoutes.get(`${basePath}`, isAuth, electionController.getIndex);

electionRoutes.get(`${basePath}/create`, isAuth, electionController.getCreate);
electionRoutes.post(
  `${basePath}/create`,
  isAuth,
  electionController.postCreate
);

electionRoutes.get(
  `${basePath}/edit/:electionId`,
  isAuth,
  electionController.getEdit
);
electionRoutes.post(`${basePath}/edit`, electionController.postEdit);

electionRoutes.get(
  `${basePath}/finalize/:electionId`,
  isAuth,
  electionController.getFinalize
);
electionRoutes.post(
  `${basePath}/finalize`,
  isAuth,
  electionController.postFinalize
);

electionRoutes.get(
  `${basePath}/results/:electionId`,
  isAuth,
  electionController.getResults
);

export default electionRoutes;
