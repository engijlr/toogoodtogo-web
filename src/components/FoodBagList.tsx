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
          <Card sx={{ display: "flex", height: "120px" }}>
            <CardMedia
              component="img"
              sx={{ width: 120, height: "120px", objectFit: "cover" }}
              image={bag.imageUrl}
              alt={bag.title}
            />
            <Box
              sx={{ display: "flex", flexDirection: "column", flex: 1, p: 1.5 }}
            >
              <Box sx={{ mb: "auto" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  {bag.storeName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {bag.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 16 }} color="action" />
                  <Typography variant="caption" color="text.secondary">
                    Tomorrow {bag.pickupTime.start} - {bag.pickupTime.end}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: 16 }} color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {bag.distance.toFixed(1)} km
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      ml: "auto",
                    }}
                  >
                    <Rating value={bag.rating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {bag.rating}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through", display: "block" }}
                  >
                    {bag.originalPrice.toFixed(2)} DKK
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ fontWeight: "bold", lineHeight: 1 }}
                  >
                    {bag.price.toFixed(2)} DKK
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Chip
                    label={`${bag.quantity} left`}
                    size="small"
                    sx={{
                      bgcolor: "success.main",
                      color: "white",
                      height: "20px",
                      "& .MuiChip-label": {
                        px: 1,
                        fontSize: "0.75rem",
                      },
                    }}
                  />
                  <Chip
                    label="Ending soon"
                    size="small"
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      height: "20px",
                      "& .MuiChip-label": {
                        px: 1,
                        fontSize: "0.75rem",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
