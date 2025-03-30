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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import GetAppModal from "./GetAppModal";
import Link from "next/link";

export default function Navbar() {
  const location = useSelector((state: RootState) => state.location);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  console.log(location);

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
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Food Rescue Logo"
                width={40}
                height={40}
                priority
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            {location.postalCode ||
              (location.city && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton size="small" sx={{ color: "white" }}>
                    <LocationOnIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {location.city}
                  </Typography>
                </Box>
              ))}
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
              onClick={handleOpenModal}
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
      <GetAppModal open={isModalOpen} onClose={handleCloseModal} />
    </AppBar>
  );
}
