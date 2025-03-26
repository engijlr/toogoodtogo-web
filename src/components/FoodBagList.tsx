"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useGetFoodBagsQuery } from "@/store/services/foodBagApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function FoodBagList() {
  const filters = useSelector((state: RootState) => state.filters);
  const { data: foodBags, isLoading } = useGetFoodBagsQuery({
    ...filters,
    lat: 55.676098,
    lng: 12.568337,
  });
  console.log(foodBags);
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Grid size={{ xs: 12, md: 4 }} key={key}>
            <Card>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {foodBags?.map((bag) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={bag.id}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              height="200"
              image={bag.imageUrl}
              alt={bag.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {bag.storeName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {bag.title}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {`${bag.pickupTime.start} - ${bag.pickupTime.end}`}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {`${bag.distance.toFixed(1)} km`}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {bag.foodType.map((type) => (
                  <Chip key={type} label={type} size="small" />
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={bag.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {bag.rating}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {bag.originalPrice.toFixed(2)} DKK
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {bag.price.toFixed(2)} DKK
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
