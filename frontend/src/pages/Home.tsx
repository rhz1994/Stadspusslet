import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CityPicker from "../components/CityPicker";

function Home() {
  const navigate = useNavigate();
  const [, setSelectedCity] = useState<string | null>(null);

  const handleSelectCity = (slug: string) => {
    setSelectedCity(slug);
    navigate(`/city/${slug}`);
  };

  return (
    <>
      <CityPicker onSelectCity={handleSelectCity} />
    </>
  );
}

export default Home;
