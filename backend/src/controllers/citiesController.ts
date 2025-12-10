import type { Request, Response } from "express";
import {
  getCities,
  getCityById,
  getCityBySlug,
} from "../services/citiesServices.ts";

export const getAllCitiesController = async (_req: Request, res: Response) => {
  try {
    const cities = await getCities();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch cities" });
  }
};

export const getCityController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Faulty city ID" });
  }

  try {
    const city = await getCityById(id);
    if (!city) return res.status(404).json({ message: "City was not found" });

    res.json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get city" });
  }
};

export const getCityBySlugController = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  if (!slug) {
    return res.status(400).json({ message: "Missing city slug" });
  }

  try {
    const city = await getCityBySlug(slug);
    if (!city) return res.status(404).json({ message: "City was not found" });

    res.json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get city" });
  }
};
