"use client";

import FilterSidebar from "@/components/FilterSidebar";
import FoodBagList from "@/components/FoodBagList";
import MapView from "@/components/MapView";
import RecommendedList from "@/components/RecommendedList";
import { Box, Container } from "@mui/material";
import { useState } from "react";

export default function FindBag() {
  const [mapVisible, setMapVisible] = useState(true);

  return (
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
  );
}
