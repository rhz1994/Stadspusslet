import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Stadspusslet
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>
            Hem
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
