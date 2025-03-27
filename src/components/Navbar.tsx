"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={1} color="primary">
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

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
            href="https://example.com/app"
            target="_blank"
          >
            Get the app
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
