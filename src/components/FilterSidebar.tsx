"use client";

import {
  Box,
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setSearchQuery,
  setSortBy,
  setPickupDay,
  toggleFoodType,
  toggleDietPreference,
  type SortOption,
  type FoodType,
  type DietPreference,
} from "@/store/slices/filtersSlice";

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  const foodTypes = [
    { id: "bread", label: "Bread & Pastries" },
    { id: "meals", label: "Meals" },
    { id: "groceries", label: "Groceries" },
    { id: "drinks", label: "Drinks" },
  ];

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: 280 },
        height: { xs: "auto", md: "calc(100vh - 80px)" },
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 0, sm: 1 },
        position: { xs: "static", md: "sticky" },
        top: { md: "80px" },
        zIndex: 1,
        mb: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          flex: 1,
          overflow: "auto",
          maxHeight: { xs: "none", md: "calc(100vh - 80px)" },
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
        >
          Filters
        </Typography>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <TextField
            fullWidth
            placeholder="Search stores or items"
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            size="small"
            sx={{
              "& .MuiInputBase-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: filters.searchQuery ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClearSearch}
                    edge="end"
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
          >
            Sort by
          </Typography>
          <RadioGroup
            value={filters.sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value as SortOption))}
          >
            <FormControlLabel
              value="relevance"
              control={<Radio />}
              label="Relevance"
            />
            <FormControlLabel
              value="distance"
              control={<Radio />}
              label="Distance"
            />
            <FormControlLabel value="price" control={<Radio />} label="Price" />
            <FormControlLabel
              value="rating"
              control={<Radio />}
              label="Rating"
            />
          </RadioGroup>
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
          >
            Collection day
          </Typography>
          <ToggleButtonGroup
            value={filters.pickupDay}
            exclusive
            onChange={(e, value) => value && dispatch(setPickupDay(value))}
            fullWidth
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                py: { xs: 0.5, sm: 0.75 },
              },
            }}
          >
            <ToggleButton value="today">Today</ToggleButton>
            <ToggleButton value="tomorrow">Tomorrow</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
          >
            Food types
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {foodTypes.map((type) => (
              <Chip
                key={type.id}
                label={type.label}
                onClick={() => dispatch(toggleFoodType(type.id as FoodType))}
                color={
                  filters.foodTypes.includes(type.id as FoodType)
                    ? "primary"
                    : "default"
                }
                variant={
                  filters.foodTypes.includes(type.id as FoodType)
                    ? "filled"
                    : "outlined"
                }
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  height: { xs: "24px", sm: "32px" },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
          >
            Diet preferences
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {["vegetarian", "vegan"].map((pref) => (
              <Chip
                key={pref}
                label={pref}
                onClick={() =>
                  dispatch(toggleDietPreference(pref as DietPreference))
                }
                color={
                  filters.dietPreferences.includes(pref as DietPreference)
                    ? "primary"
                    : "default"
                }
                variant={
                  filters.dietPreferences.includes(pref as DietPreference)
                    ? "filled"
                    : "outlined"
                }
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  height: { xs: "24px", sm: "32px" },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
