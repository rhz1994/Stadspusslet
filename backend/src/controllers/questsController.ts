import type { Request, Response } from "express";
import {
  getQuests,
  getQuestById,
  getQuestsByCitySlug,
} from "../services/questsServices.ts";

export const getAllQuests = async (_req: Request, res: Response) => {
  try {
    const quests = await getQuests();
    res.json(quests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch quests" });
  }
};

export const getQuest = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Faulty quest ID" });
  }

  try {
    const quest = await getQuestById(id);
    if (!quest) return res.status(404).json({ message: "Quest was not found" });

    res.json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get quest" });
  }
};

export const getQuestsForCity = async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) return res.status(404).json({ message: "Quest was not found" });
  try {
    const quests = await getQuestsByCitySlug(slug);
    res.json(quests);
  } catch (err) {
    res.status(500).json({ message: "Could not get quests", err });
  }
};
