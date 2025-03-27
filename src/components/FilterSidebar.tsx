"use client";

import {
  Box,
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
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
  setPickupTimeRange,
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

  const handleTimeRangeChange = (event: Event, newValue: number | number[]) => {
    dispatch(setPickupTimeRange(newValue as [number, number]));
  };

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
        width: 280,
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
      }}
      elevation={1}
    >
      <Box
        sx={{
          p: 2,
          flex: 1,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search stores or items"
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            size="small"
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

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
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

        <Box sx={{ mb: 3, px: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Collection time
          </Typography>
          <Slider
            value={filters.pickupTimeRange}
            onChange={handleTimeRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={24}
            marks={[
              { value: 0, label: "00:00" },
              { value: 12, label: "12:00" },
              { value: 24, label: "24:00" },
            ]}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Collection day
          </Typography>
          <ToggleButtonGroup
            value={filters.pickupDay}
            exclusive
            onChange={(e, value) => value && dispatch(setPickupDay(value))}
            fullWidth
            size="small"
          >
            <ToggleButton value="today">Today</ToggleButton>
            <ToggleButton value="tomorrow">Tomorrow</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Food types
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Diet preferences
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
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
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
