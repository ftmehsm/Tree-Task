"use client";

import Box from "@mui/material/Box";

import { rose } from "@/theme/theme";

export const CARD_HEIGHT = 44;
export const GUTTER = 52;

export function BranchArrow() {
  return (
    <Box
      aria-hidden
      sx={{
        width: GUTTER,
        height: CARD_HEIGHT,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: CARD_HEIGHT / 2 - 1,
          insetInlineStart: GUTTER / 2 - 1,
          width: GUTTER / 2 + 1,
          height: 2,
          bgcolor: rose.main,
        }}
      />
      <Box
        component="svg"
        viewBox="0 0 10 12"
        sx={{
          position: "absolute",
          top: CARD_HEIGHT / 2 - 6,
          insetInlineEnd: 0,
          width: 10,
          height: 12,
          zIndex: 1,
          bgcolor: "#FBF7F6",
          display: "block",
        }}
      >
        <polygon points="0,6 10,1 10,11" fill={rose.main} />
      </Box>
    </Box>
  );
}

export const connectorColumnSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1,
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: CARD_HEIGHT / 2 - 1,
    bottom: CARD_HEIGHT / 2 - 1,
    insetInlineStart: GUTTER / 2 - 1,
    width: 2,
    bgcolor: rose.main,
  },
} as const;
