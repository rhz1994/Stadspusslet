import { useState, useEffect } from "react";
import { City } from "../types/types";

function CityPicker() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Could not get cities", err));
  }, []);

  return (
    <div>
      <p>Välj stad</p>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity && setSelectedCity(e.target.value)}
      >
        <option value="" disabled>
          Välj stad
        </option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CityPicker;
