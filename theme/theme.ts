"use client";

import { createTheme } from "@mui/material/styles";

export const rose = {
  main: "#C47B82",
  dark: "#A85F67",
  light: "#E8C9CC",
  contrastText: "#ffffff",
};

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: rose,
    background: {
      default: "#FBF7F6",
      paper: "#ffffff",
    },
    text: {
      primary: "#3A3334",
      secondary: "#7A6A6C",
    },
  },
  typography: {
    fontFamily: "var(--font-vazirmatn), Tahoma, sans-serif",
    fontSize: 14,
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
