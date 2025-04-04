"use client";

import { Paper } from "@mui/material";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useGetFoodBagsQuery } from "@/store/services/foodBagApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { mockFoodBags, mockFoodBags2 } from "@/store/mockData";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.676098,
  lng: 12.568337,
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function MapView() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const filters = useSelector((state: RootState) => state.filters);
  const { data: queryFoodBags } = useGetFoodBagsQuery({
    ...filters,
    query: filters.searchQuery,
    lat: center.lat,
    lng: center.lng,
    initialData: [...mockFoodBags, ...mockFoodBags2],
  });

  if (!isLoaded) return null;

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        height: { xs: 300, sm: 400 },
        overflow: "hidden",
        borderRadius: { xs: 0, sm: 1 },
        mb: { xs: 2, md: 0 },
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={defaultOptions}
      >
        {queryFoodBags?.map((bag) => (
          <MarkerF
            key={bag.id}
            position={{
              lat: bag.location.lat,
              lng: bag.location.lng,
            }}
            title={bag.storeName}
          />
        ))}
      </GoogleMap>
    </Paper>
  );
}
