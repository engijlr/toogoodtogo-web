"use client";

import { Paper } from "@mui/material";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useGetFoodBagsQuery } from "@/store/services/foodBagApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 55.676098, // Copenhagen coordinates
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
  const { data: foodBags } = useGetFoodBagsQuery({
    ...filters,
    lat: center.lat,
    lng: center.lng,
  });

  if (!isLoaded) return null;

  return (
    <Paper
      elevation={1}
      sx={{ width: "100%", height: 400, overflow: "hidden" }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={defaultOptions}
      >
        {foodBags?.map((bag) => (
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
