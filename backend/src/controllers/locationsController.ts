import type { Request, Response } from "express";
import {
  getLocations,
  getLocationById,
} from "../services/locationsServices.ts";

export const getAllLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await getLocations();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch locations" });
  }
};

export const getLocation = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Faulty location ID" });
  }

  try {
    const location = await getLocationById(id);
    if (!location)
      return res.status(404).json({ message: "Location was not found" });

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not get location" });
  }
};
