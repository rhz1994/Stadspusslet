import { Router } from "express";
import { getAllPuzzles, getPuzzle } from "../controllers/puzzlesController.ts";

const router = Router();

router.get("/", getAllPuzzles);
router.get("/:id", getPuzzle);

export default router;
