import { database } from "../../database.ts";
import type { RowDataPacket } from "mysql2";
import type { Location } from "../types/types.ts";

export const getLocations = async (): Promise<Location[]> => {
  const [rows] = await database.query<RowDataPacket[] & Location[]>(
    "SELECT * FROM locations"
  );
  return rows as Location[];
};

export const getLocationById = async (id: number): Promise<Location | null> => {
  const [rows] = await database.query<RowDataPacket[] & Location[]>(
    "SELECT * FROM locations WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Location) : null;
};
