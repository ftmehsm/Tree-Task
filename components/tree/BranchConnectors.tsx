"use client";

import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { rose } from "@/theme/theme";

export function BranchArrow() {
  return (
    <Box
      aria-hidden
      sx={{
        width: 36,
        alignSelf: "stretch",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: rose.main,
        position: "relative",
      }}
    >
      <KeyboardArrowLeftIcon
        sx={{
          fontSize: 22,
          bgcolor: "#FBF7F6",
          borderRadius: "50%",
          position: "relative",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
