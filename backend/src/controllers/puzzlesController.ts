import type { Request, Response } from "express";
import { getPuzzles, getPuzzleById } from "../services/puzzlesService.ts";

export const getAllPuzzles = async (_req: Request, res: Response) => {
  try {
    const puzzles = await getPuzzles();
    res.json(puzzles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch puzzles" });
  }
};

export const getPuzzle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Faulty quest ID" });
  }

  try {
    const puzzle = await getPuzzleById(id);
    if (!puzzle)
      return res.status(404).json({ message: "Puzzle was not found" });

    res.json(puzzle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get quest" });
  }
};
