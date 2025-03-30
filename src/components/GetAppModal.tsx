import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface GetAppModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GetAppModal({ open, onClose }: GetAppModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="get-app-modal"
      aria-describedby="scan-qr-code-to-get-app"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 380,
          height: 470,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 5,
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Save more food using
          <br /> our app 💚
        </Typography>

        <Box
          sx={{
            width: 200,
            height: 200,
            mx: "auto",
            mb: 2,
            position: "relative",
          }}
        >
          <Image
            src="/qr-code.png"
            alt="QR Code to download app"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "success.main",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => {
            window.open("https://toogoodtogo.com/download-app", "_blank");
          }}
        >
          Or continue in browser
        </Typography>
      </Box>
    </Modal>
  );
}
