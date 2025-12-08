import { database } from "../../database.ts";
import type { RowDataPacket } from "mysql2";
import type { Puzzle } from "../types/types.ts";

export const getPuzzles = async (): Promise<Puzzle[]> => {
  const [rows] = await database.query<RowDataPacket[] & Puzzle[]>(
    "SELECT * FROM puzzles"
  );
  return rows as Puzzle[];
};

export const getPuzzleById = async (id: number): Promise<Puzzle | null> => {
  const [rows] = await database.query<RowDataPacket[] & Puzzle[]>(
    "SELECT * FROM puzzles WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Puzzle) : null;
};
