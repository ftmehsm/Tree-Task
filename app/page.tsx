"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AccountTree from "@/components/tree/AccountTree";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 5 },
      }}
    >
      <AccountTree />
    </Box>
  );
}
