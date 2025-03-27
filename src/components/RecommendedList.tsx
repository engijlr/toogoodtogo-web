// components/RecommendedList.tsx
"use client";

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { recommendedBags } from "@/store/mockData";

export default function RecommendedList() {
  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Recommended for you</Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
          See all
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          px: 2,
          pb: 2,
        }}
      >
        {recommendedBags.map((bag) => (
          <Card
            key={bag.id}
            sx={{
              flex: "1 1 calc(25% - 16px)", // 4 cards per row, subtracting gap
              maxWidth: "calc(25% - 16px)",
              minWidth: 260,
              borderRadius: 2,
              boxShadow: 1,
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="140"
                image={bag.imageUrl}
                alt={bag.title}
                sx={{ objectFit: "cover" }}
              />

              <Chip
                label={`${bag.quantity} left`}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "#f1f1c6",
                  fontWeight: 600,
                }}
              />
              <Chip
                label="Ending soon"
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 100,
                  backgroundColor: "#f1f1c6",
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={<StarIcon sx={{ color: "white" }} />}
                label={bag.rating}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: 600,
                }}
              />
              <Box
                component="img"
                src={bag.logoUrl}
                alt="store logo"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  position: "absolute",
                  bottom: -18,
                  left: 12,
                  border: "2px solid white",
                }}
              />
            </Box>

            <CardContent sx={{ pt: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography fontWeight={600} variant="subtitle2">
                    {bag.storeName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {bag.title}
                  </Typography>
                </Box>
                <IconButton size="small">
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Collect {bag.pickupTime}
                </Typography>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {bag.distance} km
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  alignItems: "flex-end",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "#999" }}
                  >
                    {bag.originalPrice.toFixed(2)} DKK
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {bag.price.toFixed(2)} DKK
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
