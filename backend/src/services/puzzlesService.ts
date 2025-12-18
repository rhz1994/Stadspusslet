import { database } from "../../database.ts";
import type { RowDataPacket } from "mysql2";
import type { PuzzleDB } from "../types/types.ts";

export const getPuzzles = async (): Promise<PuzzleDB[]> => {
  const [rows] = await database.query<RowDataPacket[] & PuzzleDB[]>(
    "SELECT * FROM puzzles"
  );
  return rows as PuzzleDB[];
};

export const getPuzzleById = async (id: number): Promise<PuzzleDB | null> => {
  const [rows] = await database.query<RowDataPacket[] & PuzzleDB[]>(
    "SELECT * FROM puzzles WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as PuzzleDB) : null;
};

export const getPuzzlesByQuestId = async (
  questId: number
): Promise<PuzzleDB[]> => {
  const [rows] = await database.query<RowDataPacket[] & PuzzleDB[]>(
    `
    SELECT
      p.id, p.quest_id, p.location_id, p.puzzle_text, p.correct_answer,
      p.order_number, p.clue_text, p.correct_clue_location, p.puzzle_type,
      l.latitude AS locationLat, l.longitude AS locationLon,
      c.latitude AS cityLat, c.longitude AS cityLon
    FROM puzzles p
    JOIN locations l ON p.location_id = l.id
    JOIN cities c ON l.city_id = c.id
    WHERE p.quest_id = ?
    ORDER BY p.order_number ASC
    `,
    [questId]
  );
  return rows as PuzzleDB[];
};
