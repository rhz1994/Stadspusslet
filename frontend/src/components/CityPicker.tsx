import { CityProps } from "../types/types";

function CityPicker({ city, setCity }: CityProps) {
  const cities = ["Gothenburg", "Rome", "Prague"];

  return (
    <div>
      <p>Välj stad</p>
      <select value={city} onChange={(e) => setCity && setCity(e.target.value)}>
        <option value="" disabled>
          Välj stad
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CityPicker;
