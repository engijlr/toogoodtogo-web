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
import StarIcon from "@mui/icons-material/Star";
import { recommendedBags } from "@/store/mockData";

export default function RecommendedList() {
  return (
    <Box sx={{ pb: 2 }}>
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
          gap: 3,
          overflowX: "auto",
          pt: 2,
          pb: 2,
          px: 1,
        }}
      >
        {recommendedBags.map((bag) => (
          <Card
            key={bag.id}
            sx={{
              width: 300,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              boxShadow: 3,
              backgroundColor: "white",
              flex: "0 0 auto",
            }}
          >
            <Box sx={{ position: "relative", bgcolor: "#fcefcf" }}>
              <CardMedia
                component="img"
                image={bag.imageUrl}
                alt={bag.title}
                sx={{
                  height: 180,
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
                icon={<StarIcon sx={{ color: "white" }} />}
                label={bag.rating}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#388e3c",
                  color: "white",
                  fontWeight: 600,
                }}
              />

              {/* Store logo in circle */}
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
                  backgroundColor: "#333", // dark circle background
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
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ fontSize: "0.95rem", lineHeight: 1.3 }}
                >
                  {bag.storeName}
                </Typography>
                <IconButton size="small">
                  <FavoriteBorderIcon fontSize="small" />
                </IconButton>
              </Box>

              <Typography
                variant="body2"
                sx={{ fontSize: "0.85rem", color: "#444" }}
              >
                {bag.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Pick up today: {bag.pickupTime}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {bag.distance.toFixed(1)} km
                </Typography>
              </Box>

              <Box
                sx={{
                  borderTop: "1px dashed #ddd",
                  mt: 1,
                  pt: 1,
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
        ))}
      </Box>
    </Box>
  );
}
