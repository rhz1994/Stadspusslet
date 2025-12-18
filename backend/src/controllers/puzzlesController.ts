import type { Request, Response } from "express";
import type { PuzzleDB } from "../types/types.ts";
import {
  getPuzzles,
  getPuzzleById,
  getPuzzlesByQuestId,
} from "../services/puzzlesService.ts";

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

export const getPuzzlesByQuest = async (req: Request, res: Response) => {
  const questId = Number(req.params.questId);
  if (isNaN(questId)) {
    return res.status(400).json({ message: "Faulty quest ID" });
  }

  try {
    const puzzles = await getPuzzlesByQuestId(questId);

    if (puzzles.length === 0) {
      return res
        .status(404)
        .json({ message: "No puzzles found for this quest" });
    }

    const formatted = (puzzles as PuzzleDB[]).map((p) => ({
      id: p.id,
      questId: p.quest_id,
      locationId: p.location_id,
      puzzleText: p.puzzle_text,
      clueText: p.clue_text,
      correctAnswer: p.correct_answer,
      correctClueLocation: p.correct_clue_location,
      orderNumber: p.order_number,
      puzzleType: p.puzzle_type,
      locationLat: p.locationLat,
      locationLon: p.locationLon,
      cityLat: p.cityLat,
      cityLon: p.cityLon,
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get puzzles for quest" });
  }
};
