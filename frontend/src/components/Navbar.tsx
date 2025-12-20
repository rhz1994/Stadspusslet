import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
