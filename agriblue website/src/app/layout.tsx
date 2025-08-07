import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "AgriBlu - The Future of Farming",
  description: "Revolutionizing agriculture with intelligent aeroponics systems that deliver higher yields with unparalleled efficiency.",
  keywords: ["AgriBlu", "aeroponics", "agriculture", "farming", "CEA", "controlled environment agriculture", "sustainable farming"],
  authors: [{ name: "AgriBlu Team" }],
  openGraph: {
    title: "AgriBlu - The Future of Farming",
    description: "Revolutionizing agriculture with intelligent aeroponics systems",
    url: "https://agriblu.com",
    siteName: "AgriBlu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgriBlu - The Future of Farming",
    description: "Revolutionizing agriculture with intelligent aeroponics systems",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased bg-agri-dark text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
