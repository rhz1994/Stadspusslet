import { useState } from "react";
import CityPicker from "../components/CityPicker";
import PuzzleCard from "../components/PuzzleCard";

function Home() {
  const [city, setCity] = useState<string>("");
  return (
    <>
      <h1>Stadspusslet</h1>
      <p>Välkommen!</p>
      <CityPicker city={city} setCity={setCity} />
      {city && <PuzzleCard city={city} />}
    </>
  );
}

export default Home;
