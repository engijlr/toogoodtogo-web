"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetFoodBagsQuery, FoodBag } from "@/store/services/foodBagApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface FoodBagListProps {
  title?: string;
  initialFoodBags?: FoodBag[];
  useFilters?: boolean;
}

export default function FoodBagList({
  title = "Recommended for you",
  initialFoodBags,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFilters = true,
}: FoodBagListProps) {
  const filters = useSelector((state: RootState) => state.filters);
  const { data: foodBags, isLoading } = useGetFoodBagsQuery({
    ...filters,
    query: filters.searchQuery,
    lat: 55.676098,
    lng: 12.568337,
    initialData: initialFoodBags,
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
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            See all
          </Typography>
        </Box>
        <CarouselContent className="py-4 px-4">
          {foodBags?.map((bag) => (
            <CarouselItem key={bag.id} className="px-2 basis-auto">
              <Card
                sx={{
                  width: 400,
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: 3,
                  backgroundColor: "white",
                  flex: "0 0 auto",
                }}
              >
                {/* Image and top chips */}
                <Box sx={{ position: "relative", bgcolor: "#fcefcf" }}>
                  <CardMedia
                    component="img"
                    image={bag.imageUrl}
                    alt={bag.title}
                    sx={{
                      height: 130,
                      objectFit: "cover",
                    }}
                  />
                  <Chip
                    label={`${bag.quantity} left`}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor: "#e0f2c2",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    icon={<StarIcon sx={{ color: "#000", fill: "#48a999" }} />}
                    label={bag.rating}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "#fff",
                      color: "#000",
                      fontWeight: 600,
                    }}
                  />

                  {/* Store logo */}
                  <Box
                    component="img"
                    src={bag.logoUrl}
                    alt="store logo"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: 14,
                      left: 16,
                      border: "2px solid white",
                      backgroundColor: "#333",
                      p: 0.5,
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{ fontSize: "0.95rem", lineHeight: 1.3 }}
                    >
                      {bag.storeName}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.85rem", color: "#444" }}
                  >
                    {bag.title}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Pick up: {bag.pickupTime.start} - {bag.pickupTime.end}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {" "}
                      | {bag.distance.toFixed(1)} km
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      borderTop: "1px dashed #ddd",
                      mt: 0.5,
                      pt: 0.5,
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "#999",
                        fontWeight: 400,
                      }}
                    >
                      DKK{bag.originalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                      DKK{bag.price.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Grid>
  );
}
