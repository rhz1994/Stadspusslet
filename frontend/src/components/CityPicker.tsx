import { useState, useEffect } from "react";
import { City, Coordinates } from "../types/types";
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

function CityPicker() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const storedConsent = localStorage.getItem("locationConsent");
  const [hasConsent, setHasConsent] = useState(storedConsent === "true");
  const [open, setOpen] = useState(storedConsent === null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);

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
          lat: position.coords.latitude,
          lon: position.coords.longitude,
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
  }, [hasConsent, coords]);

  const resetConsent = () => {
    localStorage.removeItem("locationConsent");
    setHasConsent(false);
    setCoords(null);
    setOpen(true);
  };

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
              Din position: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
            </p>
          ) : null}
          <p>Välj stad</p>
          <List>
            {cities.map((city) => (
              <ListItem disablePadding key={city.id}>
                <ListItemButton
                  selected={selectedCity === city.id.toString()}
                  onClick={() => setSelectedCity(city.id.toString())}
                >
                  <ListItemAvatar>
                    <Avatar src={`/${city.icon}`} />
                  </ListItemAvatar>
                  <ListItemText primary={city.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
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
