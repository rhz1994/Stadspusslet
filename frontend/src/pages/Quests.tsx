import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Quest } from "../types/types";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";

function Quests() {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/quests/city/${citySlug}`)
      .then((res) => res.json())
      .then((data) => setQuests(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [citySlug]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <CircularProgress size={60} />
        <Typography variant="h6" mt={2} color="text.secondary">
          Hämtar quests...
        </Typography>
      </Box>
    );
  }

  return (
    <Container data-testid="quest-list" maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Pussel i {citySlug}
      </Typography>

      <Stack spacing={3}>
        {quests.length > 0 ? (
          quests.map((quest) => (
            <Card key={quest.id} sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight="bold">
                    {quest.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quest.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate(`/quest/${citySlug}/${quest.id}`)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Starta quest
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Inga pussel hittades för denna stad.
          </Typography>
        )}
      </Stack>
    </Container>
  );
}

export default Quests;
