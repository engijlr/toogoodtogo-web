import { Box, Container } from "@mui/material";
import Image from "next/image";

interface PartnerMarqueeProps {
  logos: string[];
  direction?: "left" | "right";
}

export default function PartnerMarquee({
  logos,
  direction = "left",
}: PartnerMarqueeProps) {
  return (
    <Box sx={{ backgroundColor: "white", py: 3, overflow: "hidden" }}>
      <Container maxWidth={false} sx={{ px: 0 }}>
        <Box
          className="marquee-wrapper"
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            className={`marquee-track ${direction}`}
            sx={{
              display: "flex",
              width: "fit-content",
              animation: `scroll${
                direction === "left" ? "Left" : "Right"
              } 100s linear infinite`,
              "&:hover": {
                animationPlayState: "paused",
              },
              "@keyframes scrollLeft": {
                "0%": {
                  transform: "translateX(0)",
                },
                "100%": {
                  transform: "translateX(-50%)",
                },
              },
              "@keyframes scrollRight": {
                "0%": {
                  transform: "translateX(-50%)",
                },
                "100%": {
                  transform: "translateX(0)",
                },
              },
            }}
          >
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <Box
                key={`first-${index}`}
                className="marquee-item"
                sx={{
                  marginX: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={`/${logo}`}
                  alt={`Partner logo ${index + 1}`}
                  width={100}
                  height={50}
                  style={{
                    objectFit: "contain",
                    transition: "all 0.8s ease",
                  }}
                />
              </Box>
            ))}
            {/* Second set of logos (exact duplicate) */}
            {logos.map((logo, index) => (
              <Box
                key={`second-${index}`}
                className="marquee-item"
                sx={{
                  marginX: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={`/${logo}`}
                  alt={`Partner logo ${index + 1}`}
                  width={100}
                  height={50}
                  style={{
                    objectFit: "contain",
                    transition: "all 0.8s ease",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
