import { Router } from "express";
import {
  getAllLocations,
  getLocation,
} from "../controllers/locationsController.ts";

const router = Router();

router.get("/", getAllLocations);
router.get("/:id", getLocation);

export default router;
