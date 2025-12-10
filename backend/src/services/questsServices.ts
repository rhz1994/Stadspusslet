import { database } from "../../database.ts";
import type { RowDataPacket } from "mysql2";
import type { Quest } from "../types/types.ts";
import { getCityBySlug } from "./citiesServices.ts";

export const getQuests = async (): Promise<Quest[]> => {
  const [rows] = await database.query<RowDataPacket[] & Quest[]>(
    "SELECT * FROM quests"
  );
  return rows as Quest[];
};

export const getQuestById = async (id: number): Promise<Quest | null> => {
  const [rows] = await database.query<RowDataPacket[] & Quest[]>(
    "SELECT * FROM quests WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Quest) : null;
};
export const getQuestsByCitySlug = async (slug: string): Promise<Quest[]> => {
  const city = await getCityBySlug(slug);
  if (!city) return [];

  const [rows] = await database.query<RowDataPacket[] & Quest[]>(
    "SELECT * FROM quests WHERE city_id = ?",
    [city.id]
  );
  return rows as Quest[];
};
