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
    query: filters.searchQuery,
    lat: 55.676098,
    lng: 12.568337,
  });
  console.log(foodBags);
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((key) => (
          <Grid size={{ xs: 12, sm: 12, md: 4 }} key={key}>
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
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={bag.id}>
          <Card
            sx={{
              display: "flex",
              height: "auto",
              minHeight: { xs: "100px", sm: "120px" },
              overflow: "hidden",
              "&:hover": {
                boxShadow: 3,
                transition: "box-shadow 0.3s ease-in-out",
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 120, height: "fit", objectFit: "cover" }}
              image={bag.imageUrl}
              alt={bag.title}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                p: { xs: 1, sm: 1.5 },
                minWidth: 0, // Prevent content from overflowing
              }}
            >
              <Box sx={{ mb: "auto" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {bag.storeName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {bag.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                    flexWrap: "nowrap",
                  }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                    color="action"
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
                    Tomorrow {bag.pickupTime.start} - {bag.pickupTime.end}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    flexWrap: "nowrap",
                  }}
                >
                  <LocationOnIcon
                    sx={{ fontSize: { xs: 14, sm: 16 } }}
                    color="action"
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                  >
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
                    <Rating
                      value={bag.rating}
                      readOnly
                      size="small"
                      sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
                    >
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
                  flexWrap: "wrap", // ✅ In case text overflows on smaller screens
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 0.5,
                    flexShrink: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontWeight: "bold",
                      lineHeight: 1,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bag.price.toFixed(2)} DKK
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      textDecoration: "line-through",
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bag.originalPrice.toFixed(2)} DKK
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Chip
                    label={`${bag.quantity} left`}
                    size="small"
                    sx={{
                      bgcolor: "success.main",
                      color: "white",
                      height: { xs: "18px", sm: "20px" },
                      "& .MuiChip-label": {
                        px: { xs: 0.5, sm: 1 },
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      },
                    }}
                  />
                  <Chip
                    label="Ending soon"
                    size="small"
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      height: { xs: "18px", sm: "20px" },
                      "& .MuiChip-label": {
                        px: { xs: 0.5, sm: 1 },
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
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
