import { Router } from "express";
import {
  getAllCitiesController,
  getCityController,
  getCityBySlugController,
} from "../controllers/citiesController.ts";

const router = Router();

router.get("/", getAllCitiesController);
router.get("/id/:id", getCityController);
router.get("/slug/:slug", getCityBySlugController);

export default router;
