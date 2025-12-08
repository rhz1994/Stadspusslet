import { Router } from "express";
import { getAllCities, getCity } from "../controllers/citiesController.ts";

const router = Router();

router.get("/", getAllCities);
router.get("/:id", getCity);

export default router;
