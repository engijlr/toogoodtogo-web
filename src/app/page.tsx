"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { partnerLogos, partnersLogos2 } from "@/store/mockData";
import PartnerMarquee from "@/components/PartnerMarquee";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";

export default function Home() {
  const router = useRouter();

  const handleLocateMe = () => {
    router.push("/find-bag");
  };

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      router.push("/find-bag");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: "#01615F",
          color: "white",
          pt: { xs: 6, md: 12 },
          pb: { xs: 8, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 4, md: 8 },
            }}
          >
            {/* Left side */}
            <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "60%" } }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                LOOKING TO SAVE
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 4,
                  color: "#FFFB9B",
                  lineHeight: 1.2,
                }}
              >
                SOME FOOD TODAY?
              </Typography>

              {/* Search box */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: 500,
                  backgroundColor: "white",
                  borderRadius: "50px",
                  px: 2,
                  py: 1,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <PlaceOutlinedIcon sx={{ color: "action.active", mr: 1 }} />
                <Box sx={{ flex: 1 }}>
                  <PlacesAutocomplete onPlaceSelect={handlePlaceSelect} />
                </Box>
                <Button
                  onClick={handleLocateMe}
                  startIcon={<NearMeOutlinedIcon />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: "black",
                    borderRadius: "50px",
                    minWidth: "auto",
                    px: 2,
                    textWrap: "nowrap",
                    "& .MuiButton-endIcon": {
                      ml: 0.5,
                    },
                  }}
                >
                  Locate me
                </Button>
              </Box>
            </Box>

            {/* Right side images */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "487px",
                  height: "398px",
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/hero-image.png"
                  alt="Hero visual"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Partners Section */}
      <PartnerMarquee logos={partnerLogos} />
      <PartnerMarquee logos={partnersLogos2} direction="right" />
    </Box>
  );
}
