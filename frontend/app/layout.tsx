import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Lost in the North – Premium Travel Pakistan",
  description:
    "Discover the magic of Northern Pakistan. Book tours, hotels, and cars with The Lost in the North.",
  keywords: ["Pakistan travel", "Northern Pakistan tours", "Gilgit Baltistan", "Hunza", "Skardu"],
  openGraph: {
    title: "The Lost in the North",
    description: "Premium travel experiences in Northern Pakistan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter bg-stone-50 text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1a1a2e",
              color: "#fff",
              borderRadius: "12px",
              padding: "12px 20px",
            },
          }}
        />
      </body>
    </html>
  );
}
