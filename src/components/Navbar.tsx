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
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Image
            src="/logo.svg"
            alt="Food Rescue Logo"
            width={40}
            height={40}
            priority
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small" color="primary">
              <LocationOnIcon />
            </IconButton>
            <Typography variant="body1">2300, Copenhagen</Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            href="https://example.com/app"
            target="_blank"
          >
            Get the app
          </Button>
          <Button variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
