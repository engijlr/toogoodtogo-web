"use client";

import { Box, Container } from "@mui/material";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import FoodBagList from "@/components/FoodBagList";
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import RecommendedList from "@/components/RecommendedList";

export default function Home() {
  const [mapVisible, setMapVisible] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1, p: 4 }}>
        <FilterSidebar />
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            py: 2,
            width: "75%",
          }}
          className="bg-white rounded-lg"
        >
          {mapVisible && <MapView />}
          <FoodBagList />
          <RecommendedList />
        </Container>
      </Box>
    </Box>
  );
}
