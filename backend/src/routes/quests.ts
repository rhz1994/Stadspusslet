import { Router } from "express";
import { getAllQuests, getQuest } from "../controllers/questsController.ts";

const router = Router();

router.get("/", getAllQuests);
router.get("/:id", getQuest);

export default router;
