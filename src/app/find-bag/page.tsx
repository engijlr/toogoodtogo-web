"use client";

import FilterSidebar from "@/components/FilterSidebar";
import FoodBagList from "@/components/FoodBagList";
import MapView from "@/components/MapView";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { mockFoodBags, mockFoodBags2 } from "@/store/mockData";

export default function FindBag() {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mapVisible, setMapVisible] = useState(true);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flex: 1, py: 4 }}>
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
          <FoodBagList
            title="Recommended for you"
            initialFoodBags={mockFoodBags}
          />
          <FoodBagList
            title="Save before it's too late"
            initialFoodBags={mockFoodBags2}
          />
        </Container>
      </Box>
    </Container>
  );
}
