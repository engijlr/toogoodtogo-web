"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLocateMe = () => {
    router.push("/find-bag");
  };

  const partnerLogos = [
    "lidl.png",
    "7eleven.png",
    "hello.png",
    "q8.png",
    "radisson.png",
    "starbucks.png",
    "coop.png",
    "scandic.png",
    "flammen.png",
    "meny.png",
    "ikea.png",
    "kfc.png",
    "laplace.png",
    "superbrugsen.png",
    "bakemyday.png",
    "netto.png",
    "tsc.png",
    "netto.png",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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

                <TextField
                  placeholder="Enter postal code or city name"
                  variant="standard"
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      "& input": {
                        padding: "10px 0",
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "white",
                  }}
                />

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
      <Box sx={{ backgroundColor: "white", py: 6 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(3, 1fr)",
                sm: "repeat(4, 1fr)",
                md: "repeat(6, 1fr)",
              },
              gap: 4,
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {partnerLogos.map((logo, index) => (
              <Box
                key={index}
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <Image
                  src={`/${logo}`}
                  alt={`Partner logo ${index + 1}`}
                  width={60}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
