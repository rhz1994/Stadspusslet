import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CityPicker from "../components/CityPicker";

function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSelectCity = (slug: string) => {
    setSelectedCity(slug);
    navigate(`/city/${slug}`);
  };

  return (
    <>
      <h1>Stadspusslet</h1>
      <p>{selectedCity ?? "Välj stad"}</p>
      <CityPicker onSelectCity={handleSelectCity} />
    </>
  );
}

export default Home;
