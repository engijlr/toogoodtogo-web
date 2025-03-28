"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image
              src="/logo.svg"
              alt="Food Rescue Logo"
              width={40}
              height={40}
              priority
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small" sx={{ color: "white" }}>
                <LocationOnIcon />
              </IconButton>
              <Typography variant="body1" sx={{ color: "white" }}>
                2300, Copenhagen
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Typography sx={{ color: "white", cursor: "pointer" }}>
              Jobs
            </Typography>
            <Typography sx={{ color: "white", cursor: "pointer" }}>
              Partners
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "white",
                color: "#01615F",
                textTransform: "none",
                fontWeight: 600,
                px: 2,
                py: 1,
                "&:hover": {
                  backgroundColor: "#f4f4f4",
                },
              }}
            >
              Get the app
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
