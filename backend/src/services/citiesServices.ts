import { database } from "../../database.ts";
import type { RowDataPacket } from "mysql2";
import type { City } from "../types/types.ts";

export const getCities = async (): Promise<City[]> => {
  const [rows] = await database.query<RowDataPacket[] & City[]>(
    "SELECT * FROM cities"
  );
  return rows as City[];
};

export const getCityById = async (id: number): Promise<City | null> => {
  const [rows] = await database.query<RowDataPacket[] & City[]>(
    "SELECT * FROM cities WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as City) : null;
};
