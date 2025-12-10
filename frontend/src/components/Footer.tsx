import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 4,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; 2025 Stadspusslet. Alla rättigheter förbehållna.
      </Typography>
    </Box>
  );
}

export default Footer;
