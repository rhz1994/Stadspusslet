import express from "express";
import { database } from "./database.ts";

const app = express();

interface City extends RowDataPacket {
  id: number;
  name: string;
  population: number;
}

app.get("/", async (_request, response) => {
  const [results] = await database.query<City[]>("SELECT * FROM cities");

  response.send(results);
});

app.use(express.json());

app.listen(3000, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
