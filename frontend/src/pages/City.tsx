import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function City() {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/cities/slug/${citySlug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched city:", data);
        setCityName(data.name || citySlug);
      });
  }, [citySlug]);

  return (
    <div>
      <h1>{cityName}</h1>
      <button onClick={() => navigate(`/city/${citySlug}/quests`)}>
        Start Quests
      </button>
    </div>
  );
}

export default City;
