import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "درختواره حساب‌ها",
  description: "نمایش درختی حساب‌ها با برش، کپی، چسباندن، حذف و افزودن زیرشاخه",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full">
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
