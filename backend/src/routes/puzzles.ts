import { Router } from "express";
import {
  getAllPuzzles,
  getPuzzle,
  getPuzzlesByQuest,
} from "../controllers/puzzlesController.ts";

const router = Router();

router.get("/", getAllPuzzles);
router.get("/:id", getPuzzle);
router.get("/quest/:questId", getPuzzlesByQuest);

export default router;
