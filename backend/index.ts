import express from "express";
import citiesRoutes from "./src/routes/cities.ts";
import questsRoutes from "./src/routes/quests.ts";
import locationsRoutes from "./src/routes/locations.ts";
import puzzlesRoutes from "./src/routes/puzzles.ts";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/cities", citiesRoutes);
app.use("/quests", questsRoutes);
app.use("/locations", locationsRoutes);
app.use("/puzzles", puzzlesRoutes);

app.listen(3000, () => {
  console.log("Servern kör på port 3000");
});
