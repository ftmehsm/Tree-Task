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
      <Typography
        component="h1"
        sx={{
          textAlign: "center",
          fontSize: { xs: 18, md: 22 },
          fontWeight: 700,
          color: "text.primary",
          mb: 4,
        }}
      >
        در این صفحه هر یک از آیتم‌ها قابلیت باز و بسته شدن دارند مانند تصویر زیر
      </Typography>
      <AccountTree />
    </Box>
  );
}
