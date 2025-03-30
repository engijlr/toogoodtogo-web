import { useState, useEffect } from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";
import { setLocation } from "@/store/slices/locationSlice";

const libraries: "places"[] = ["places"];

interface PlacesAutocompleteProps {
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
}

export default function PlacesAutocomplete({
  onPlaceSelect,
}: PlacesAutocompleteProps) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      setAutocomplete(new google.maps.places.AutocompleteService());
      // Create a dummy div for PlacesService (required but not used in the UI)
      const dummyDiv = document.createElement("div");
      setPlacesService(new google.maps.places.PlacesService(dummyDiv));
    }
  }, [isLoaded]);

  const extractLocationInfo = (description: string) => {
    const parts = description.split(", ");
    let postalCode = "";
    let city = "";

    // Look for postal code pattern (4 digits in Denmark)
    for (const part of parts) {
      if (/^\d{4}$/.test(part.trim())) {
        postalCode = part.trim();
        // City is typically right after the postal code
        const cityIndex = parts.indexOf(part) + 1;
        if (cityIndex < parts.length) {
          city = parts[cityIndex].trim();
        }
        break;
      }
    }

    // If no postal code found but we have parts, use the first part as city
    if (!city && parts.length > 0) {
      city = parts[0].trim();
    }

    return { postalCode, city };
  };

  const fetchPlacePredictions = async (input: string) => {
    if (!autocomplete || !input.trim()) {
      setOptions([]);
      return;
    }

    try {
      const response = await autocomplete.getPlacePredictions({
        input,
        componentRestrictions: { country: "dk" },
        types: ["geocode"],
      });

      console.log("Autocomplete response:", response);
      setOptions(response?.predictions || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setOptions([]);
    }
  };

  const handlePlaceSelect = async (
    prediction: google.maps.places.AutocompletePrediction | null
  ) => {
    if (!prediction || !placesService || !onPlaceSelect) return;

    try {
      placesService.getDetails(
        {
          placeId: prediction.place_id,
          fields: ["formatted_address", "geometry", "name", "place_id"],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const { postalCode, city } = extractLocationInfo(
              prediction.description
            );
            dispatch(setLocation({ postalCode, city }));
            onPlaceSelect(place);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  if (loadError)
    return <TextField fullWidth error helperText="Error loading Google Maps" />;
  if (!isLoaded)
    return <TextField fullWidth disabled placeholder="Loading..." />;

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      includeInputInList
      filterSelectedOptions
      value={null}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        fetchPlacePredictions(newInputValue);
      }}
      onChange={(_, newValue) => {
        if (typeof newValue !== "string") {
          handlePlaceSelect(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Enter postal code or city name"
          variant="standard"
          fullWidth
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            sx: {
              "& input": {
                padding: "10px 0",
              },
            },
          }}
          sx={{
            backgroundColor: "white",
            "& .MuiAutocomplete-inputRoot": {
              p: 0,
              "& .MuiAutocomplete-input": {
                p: "10px 0",
              },
            },
          }}
        />
      )}
      sx={{
        "& .MuiAutocomplete-popper": {
          "& .MuiPaper-root": {
            borderRadius: 2,
            mt: 1,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          },
        },
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1.5,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <LocationOnIcon sx={{ color: "action.active" }} />
          {option.description}
        </Box>
      )}
    />
  );
}
