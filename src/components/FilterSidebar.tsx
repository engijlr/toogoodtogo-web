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
} from "@mui/material";
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

  return (
    <Paper
      sx={{
        width: 280,
        p: 2,
        height: "calc(100vh - 80px)",
        overflow: "auto",
        borderRadius: 0,
      }}
      elevation={1}
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
          <FormControlLabel value="rating" control={<Radio />} label="Rating" />
        </RadioGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
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
          {["meals", "bread-pastries", "groceries", "other"].map((type) => (
            <Chip
              key={type}
              label={type.replace("-", " & ")}
              onClick={() => dispatch(toggleFoodType(type as FoodType))}
              color={
                filters.foodTypes.includes(type as FoodType)
                  ? "primary"
                  : "default"
              }
              variant={
                filters.foodTypes.includes(type as FoodType)
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
    </Paper>
  );
}
