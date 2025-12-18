import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PuzzleCard from "../components/PuzzleCard";
import { Quest } from "../types/types";

function QuestPage() {
  const { questId } = useParams();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!questId) return;

    fetch(`http://localhost:3000/quests/id/${questId}`)
      .then((res) => res.json())
      .then((data) => setQuest(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [questId]);

  if (loading) return <p>Hämtar pussel...</p>;
  if (!quest) return <p>Pussel hittades ej</p>;

  return (
    <div>
      <PuzzleCard quest={quest} />
    </div>
  );
}

export default QuestPage;
