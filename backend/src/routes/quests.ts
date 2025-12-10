import { Router } from "express";
import {
  getAllQuests,
  getQuest,
  getQuestsForCity,
} from "../controllers/questsController.ts";

const router = Router();

router.get("/", getAllQuests);
router.get("/id/:id", getQuest);
router.get("/city/:slug", getQuestsForCity);

export default router;
