import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Quest } from "../types/types";

function Quests() {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/quests/city/${citySlug}`)
      .then((res) => res.json())
      .then((data) => setQuests(data))
      .catch((err) => console.error(err));
  }, [citySlug]);

  return (
    <div>
      <h2>Quests in {citySlug}</h2>
      {quests.map((quest) => (
        <button
          key={quest.id}
          onClick={() => navigate(`/quest/${citySlug}/${quest.id}`)}
        >
          {quest.name}
        </button>
      ))}
    </div>
  );
}

export default Quests;
