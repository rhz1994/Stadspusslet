import { useState, useEffect } from "react";
import { City, Coordinates, CityPickerProps } from "../types/types";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

function CityPicker({ onSelectCity }: CityPickerProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const storedConsent = localStorage.getItem("locationConsent");
  const [hasConsent, setHasConsent] = useState(storedConsent === "true");
  const [open, setOpen] = useState(storedConsent === null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [nearestCity, setNearestCity] = useState<City | null>(null);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("Could not get cities", err));
  }, []);

  const requestGeolocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    setCoords(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
        console.log(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  };

  const handleAllow = () => {
    setHasConsent(true);
    setOpen(false);
    localStorage.setItem("locationConsent", "true");
    requestGeolocation();
  };

  const handleDenied = () => {
    setHasConsent(false);
    setOpen(false);
    localStorage.setItem("locationConsent", "false");
  };

  useEffect(() => {
    if (hasConsent && !coords) {
      requestGeolocation();
    }
  }, [hasConsent]);

  const resetConsent = () => {
    localStorage.removeItem("locationConsent");
    setHasConsent(false);
    setCoords(null);
    setOpen(true);
  };

  // Haversine-formel. Hämtad från https://dev.to/ayushman/measure-distance-between-two-locations-in-javascript-using-the-haversine-formula-7dc

  function degToRad(deg: number): number {
    const rad = (deg * Math.PI) / 180;
    return rad;
  }

  function calculateDistance(
    startCoords: Coordinates,
    destCoords: Coordinates
  ): number {
    const startingLat = degToRad(startCoords.latitude);
    const startingLong = degToRad(startCoords.longitude);
    const destinationLat = degToRad(destCoords.latitude);
    const destinationLong = degToRad(destCoords.longitude);

    const radius = 6371;

    const distance =
      Math.acos(
        Math.sin(startingLat) * Math.sin(destinationLat) +
          Math.cos(startingLat) *
            Math.cos(destinationLat) *
            Math.cos(startingLong - destinationLong)
      ) * radius;

    return distance;
  }

  useEffect(() => {
    if (!coords || cities.length === 0) return;

    let minDistance = Infinity;
    let closest: City | null = null;

    cities.forEach((city) => {
      const distance = calculateDistance(
        { latitude: coords.latitude, longitude: coords.longitude },
        { latitude: city.latitude, longitude: city.longitude }
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = city;
      }
    });

    setNearestCity(closest);
  }, [coords, cities]);

  const sortedCities = coords
    ? [...cities].sort((a, b) => {
        const distanceA = calculateDistance(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: a.latitude, longitude: a.longitude }
        );
        const distanceB = calculateDistance(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: b.latitude, longitude: b.longitude }
        );
        return distanceA - distanceB;
      })
    : cities;

  console.log(nearestCity);
  return (
    <>
      <Button onClick={resetConsent}>Nollställ plats tillstånd</Button>
      <Dialog
        open={open}
        onClose={handleDenied}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Vi behöver din plats"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vi använder din plats för att visa quests nära dig. Vill du ge
            tillgång?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllow}>Godkänn</Button>
          <Button onClick={handleDenied} autoFocus>
            Neka
          </Button>
        </DialogActions>
      </Dialog>
      {hasConsent ? (
        <div>
          {loading ? (
            <>
              <CircularProgress />
              <Typography>Hämtar plats...</Typography>
            </>
          ) : coords ? (
            <p>
              Din position: {coords.latitude.toFixed(4)},
              {coords.longitude.toFixed(4)}
            </p>
          ) : null}
          <p>Välj stad</p>
          {nearestCity && (
            <Card
              sx={{
                mb: 3,
                maxWidth: 400,
                margin: "auto",
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                backgroundColor: "#f0f8ff",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`/${nearestCity.icon}`}
                alt={nearestCity.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  Närmaste stad
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {nearestCity.name}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (nearestCity?.slug) onSelectCity(nearestCity.slug);
                    }}
                  >
                    Välj stad
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          <Button onClick={() => setShowCities(true)}>
            Visa övriga städer
          </Button>
          {showCities && (
            <List>
              {sortedCities
                .filter((city) => nearestCity?.id !== city.id)
                .map((city) => (
                  <ListItem disablePadding key={city.id}>
                    <ListItemButton
                      selected={selectedCity === city.slug}
                      onClick={() => {
                        setSelectedCity(city.slug);
                        onSelectCity(city.slug);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={`/${city.icon}`} />
                      </ListItemAvatar>
                      <ListItemText primary={city.name} /> {city.latitude}
                      {city.longitude}
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          )}
        </div>
      ) : (
        <p>
          Du måste ge tillgång till platstjänster för att använda webbplatsen.
        </p>
      )}
    </>
  );
}

export default CityPicker;
