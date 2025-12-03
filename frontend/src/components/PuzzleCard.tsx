import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CityProps } from "../types/types";

function PuzzleCard({ city }: CityProps) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const puzzles: Record<
    string,
    { question: string; correctAnswer: string | string[] }
  > = {
    Gothenburg: { question: "När grundades Göteborg?", correctAnswer: "1621" },
    Rome: {
      question: "Vilken är Roms äldsta bro",
      correctAnswer: "Ponte Fabricio",
    },
    Prague: {
      question:
        "Nämn en av de två kända handskrifter som togs som krigsbyte av svenska soldater under det trettioåriga kriget?",
      correctAnswer: ["Djävulsbibeln", "Silverbibeln"],
    },
  };

  const puzzle = puzzles[city];

  const handleSubmit = () => {
    if (!puzzle) return;

    const correct = Array.isArray(puzzle.correctAnswer)
      ? puzzle.correctAnswer.includes(answer)
      : answer === puzzle.correctAnswer;

    setResult(correct ? "Rätt!" : "Fel, försök igen");
  };

  return (
    <Card
      id="puzzleContainer"
      data-testid="puzzle-container"
      sx={{ maxWidth: 400, m: 2 }}
    >
      <CardContent>
        <Typography data-testid="puzzle-header" variant="h5" gutterBottom>
          Pussel nr 1
        </Typography>

        {puzzle && (
          <>
            <img
              src={`/${city}.jpg`}
              alt={`Bild för ${city}`}
              style={{ width: "100%", marginBottom: 16 }}
            />
            <Typography
              data-testid="puzzle-question"
              variant="body1"
              gutterBottom
            >
              {puzzle.question}
            </Typography>
            <TextField
              label="Skriv ditt svar..."
              variant="outlined"
              fullWidth
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Skicka
            </Button>
            {result && (
              <Typography
                data-testid="puzzle-result"
                variant="subtitle1"
                color={result === "Rätt!" ? "success.main" : "error"}
                sx={{ marginTop: 2 }}
              >
                {result}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default PuzzleCard;
