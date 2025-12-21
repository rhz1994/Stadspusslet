import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  CircularProgress,
} from "@mui/material";

function City() {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [cityIcon, setCityIcon] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/cities/slug/${citySlug}`)
      .then((res) => res.json())
      .then((data) => {
        setCityName(data.name || citySlug);
        setCityIcon(data.icon || "");
      })
      .catch((err) => {
        console.error(err);
        setCityName(citySlug || "Okänd stad");
      })
      .finally(() => setLoading(false));
  }, [citySlug]);

  if (loading) {
    return (
      <Box textAlign="center" pr={10} pl={10}>
        <CircularProgress size={60} />
        <Typography variant="h6" mt={2} color="text.secondary">
          Hämtar stad...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ pr: 6, pl: 6 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        {cityIcon && (
          <CardMedia
            component="img"
            height="240"
            image={`/${cityIcon}`}
            alt={cityName}
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h3" fontWeight="bold" textAlign="center">
              {cityName}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/city/${citySlug}/quests`)}
              sx={{
                pr: 1.5,
                pl: 1.5,
                borderRadius: 2,
                textTransform: "none",
                width: "100%",
              }}
            >
              Starta pussel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default City;
