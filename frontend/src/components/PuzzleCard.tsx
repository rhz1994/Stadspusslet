import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import { LeafletMouseEvent } from "leaflet";

import { Puzzle, PuzzleCardProps, MapClickHandlerProps } from "../types/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

function MapClickHandler({
  activePuzzle,
  gameComplete,
  showPuzzle,
  onLocationFound,
  onWrongLocation,
}: MapClickHandlerProps) {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      if (gameComplete || showPuzzle) return;

      const { lat, lng } = e.latlng;
      const distance = Math.sqrt(
        (lat - activePuzzle.locationLat) ** 2 +
          (lng - activePuzzle.locationLon) ** 2
      );

      if (distance < 0.0005) {
        onLocationFound();
      } else {
        onWrongLocation(distance);
      }
    },
  });

  return null;
}

function PuzzleCard({ quest }: PuzzleCardProps) {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [activeOrderNumber, setActiveOrderNumber] = useState<number>(1);
  const [showPuzzle, setShowPuzzle] = useState<boolean>(false);
  const [showClue, setShowClue] = useState<boolean>(true);
  const [showMarker, setShowMarker] = useState<boolean>(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState<number[]>([]);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quest) return;

    setLoading(true);
    fetch(`http://localhost:3000/puzzles/quest/${quest.id}`)
      .then((res) => res.json())
      .then((data: Puzzle[]) => {
        setPuzzles(data);
        setActiveOrderNumber(1);
        setShowPuzzle(false);
        setShowMarker(false);
        setSolvedPuzzles([]);
        setGameComplete(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not get puzzles");
      })
      .finally(() => setLoading(false));
  }, [quest]);

  if (loading) return <Typography>Hämtar pussel...</Typography>;
  if (error) return <Typography>{error}</Typography>;
  if (puzzles.length === 0)
    return <Typography>Inget pussel hittades</Typography>;

  const activePuzzle = puzzles.find(
    (puzzle) => puzzle.orderNumber === activeOrderNumber
  );
  if (!activePuzzle && !gameComplete) return null;

  const handlePuzzleSolved = () => {
    setSolvedPuzzles([...solvedPuzzles, activePuzzle!.id]);
    setShowPuzzle(false);
    setShowMarker(false);
    setShowClue(true);

    if (activeOrderNumber < puzzles.length) {
      setActiveOrderNumber(activeOrderNumber + 1);
    } else {
      setGameComplete(true);
    }
  };

  const handleLocationFound = () => {
    setShowPuzzle(true);
    setShowMarker(true);
    setShowClue(false);
    setShowError(false);
  };

  const handleWrongLocation = () => {
    setShowError(true);
    setErrorMessage(`För långt bort! Försök igen. )`);
    setTimeout(() => setShowError(false), 2000);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "90vh",
          width: "90vw",
          margin: "0 auto",
          p: 5,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {quest.name}
        </Typography>

        <Box
          data-testid="map-container"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <MapContainer
            center={[puzzles[0].cityLat!, puzzles[0].cityLon!]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {activePuzzle && (
              <MapClickHandler
                activePuzzle={activePuzzle}
                gameComplete={gameComplete}
                showPuzzle={showPuzzle}
                onLocationFound={handleLocationFound}
                onWrongLocation={handleWrongLocation}
              />
            )}
            {showMarker && activePuzzle && (
              <Marker
                position={[activePuzzle.locationLat, activePuzzle.locationLon]}
              >
                <Popup>{activePuzzle.clueText}</Popup>
              </Marker>
            )}
          </MapContainer>
        </Box>
      </Box>

      {showClue && !showPuzzle && !gameComplete && activePuzzle && (
        <Card
          data-testid="clue-container"
          sx={{
            position: "absolute",
            top: 200,
            right: 80,
            zIndex: 1000,
            width: 300,
          }}
        >
          <CardContent>
            <Typography variant="h6">
              Ledtråd {activeOrderNumber}/{puzzles.length}
            </Typography>
            <Typography>{activePuzzle.clueText}</Typography>
            <Typography variant="caption" sx={{ mt: 2, display: "block" }}>
              Klicka på rätt plats på kartan!
            </Typography>
            {!showPuzzle && !gameComplete && (
              <Button
                variant="contained"
                onClick={() => setShowClue(!showClue)}
              >
                Dölj ledtråd
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      {!showClue && (
        <Button
          sx={{
            position: "absolute",
            top: 200,
            right: 80,
            zIndex: 1000,
            width: 100,
          }}
          variant="contained"
          onClick={() => setShowClue(!showClue)}
        >
          Visa ledtråd
        </Button>
      )}
      {showPuzzle && !gameComplete && activePuzzle && (
        <Card
          data-testid="puzzle-container"
          sx={{
            position: "absolute",
            top: 200,
            right: 80,
            zIndex: 1000,
            width: 300,
          }}
        >
          <CardContent>
            <Typography variant="h6">
              Pussel {activeOrderNumber}/{puzzles.length}
            </Typography>
            <Typography>{activePuzzle.puzzleText}</Typography>
            <TextField
              data-testid="puzzle-input"
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Skriv svar"
              sx={{ mt: 2, mb: 2 }}
            />
            <Button
              data-testid="solve-puzzle-button"
              variant="contained"
              fullWidth
              onClick={handlePuzzleSolved}
            >
              Lös pussel
            </Button>
          </CardContent>
        </Card>
      )}

      {gameComplete && (
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            width: 400,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              data-testid="puzzle-solved-message"
              variant="h4"
              gutterBottom
            >
              🎉 Grattis!
            </Typography>
            <Typography variant="h6">
              Du har löst alla pussel i {quest.name}!
            </Typography>
            <Typography color="text.secondary">
              Antal lösta pussel: {solvedPuzzles.length}/{puzzles.length}
            </Typography>
          </CardContent>
        </Card>
      )}

      {showError && (
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
            width: 300,
            textAlign: "center",
            bgcolor: "#ffebee",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="error">
              ❌ Fel plats!
            </Typography>
            <Typography variant="body2">{errorMessage}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default PuzzleCard;
