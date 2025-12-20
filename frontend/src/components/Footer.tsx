import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pr: 2,
        pl: 2,
        mt: 10,
        textAlign: "center",
        borderTop: "1px solid",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        <Link to="/uml" style={{ textDecoration: "none" }}>
          UML-diagram
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
