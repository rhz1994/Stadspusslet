import { useState, useEffect } from "react";
import { City, Coordinates, CityPickerProps } from "../types/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Container,
  Chip,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExploreIcon from "@mui/icons-material/Explore";

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
      },
      (err) => {
        console.error(err);
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

  // Funktion som hämtar avstånd mellan platser baserat på Haversine-formeln.
  // Källa: https://dev.to/ayushman/measure-distance-between-two-locations-in-javascript-using-the-haversine-formula-7dc

  function degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }} data-testid="city-picker">
      <Dialog open={open} onClose={handleDenied} data-testid="location-dialog">
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon color="primary" />
          Tillåt platstjänster
        </DialogTitle>
        <DialogContent>
          <DialogContentText data-testid="location-consent-text">
            Vi använder din plats för att visa pussel nära dig och ge dig en
            bättre upplevelse.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pl: 3, pb: 2 }}>
          <Button onClick={handleDenied} color="inherit">
            Neka
          </Button>
          <Button
            data-testid="accept-location"
            onClick={handleAllow}
            variant="contained"
          >
            Godkänn
          </Button>
        </DialogActions>
      </Dialog>
      {hasConsent ? (
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="h4" fontWeight="bold">
              Välj stad
            </Typography>
            <Button
              size="small"
              onClick={resetConsent}
              startIcon={<ExploreIcon />}
            >
              Ändra plats
            </Button>
          </Stack>

          {loading && (
            <Box textAlign="center" py={6}>
              <CircularProgress size={60} />
              <Typography variant="h6" mt={2} color="text.secondary">
                Hämtar din plats...
              </Typography>
            </Box>
          )}

          {nearestCity && (
            <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="240"
                image={`/${nearestCity.icon}`}
                alt={nearestCity.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Chip
                      label="Närmaste stad"
                      color="success"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      data-test-id="nearest-city"
                      variant="h4"
                      fontWeight="bold"
                    >
                      {nearestCity.name}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() =>
                      nearestCity?.slug && onSelectCity(nearestCity.slug)
                    }
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Välj stad
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          {cities.length > 1 && (
            <Box textAlign="center" mb={3}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setShowCities(!showCities)}
                sx={{ borderRadius: 2 }}
              >
                {showCities ? "Dölj andra städer" : "Visa andra städer"}
              </Button>
            </Box>
          )}
          {showCities && (
            <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 3 }}>
              <List sx={{ borderRadius: 3 }}>
                {sortedCities
                  .filter((city) => nearestCity?.id !== city.id)
                  .map((city) => (
                    <ListItem
                      key={city.id}
                      disablePadding
                      sx={{ borderBottom: "1px solid #eee" }}
                    >
                      <ListItemButton
                        selected={selectedCity === city.slug}
                        onClick={() => {
                          setSelectedCity(city.slug);
                          onSelectCity(city.slug);
                        }}
                        sx={{
                          py: 2,
                          "&.Mui-selected": {
                            bgcolor: "primary.light",
                            "&:hover": { bgcolor: "primary.light" },
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={`/${city.icon}`}
                            sx={{ width: 56, height: 56 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ ml: 4, color: "black" }}
                          primary={city.name}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Card>
          )}
        </Box>
      ) : (
        <Box textAlign="center" pr={8} pl={8} px={4}>
          <LocationOnIcon
            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Platstjänster krävs
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Du måste ge tillgång till platstjänster för att använda webbplatsen.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpen(true)}
          >
            Tillåt platstjänster
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default CityPicker;
