import type { Metadata } from "next";
import './globals.css'
import { Vazirmatn } from "next/font/google";
import { Providers } from './providers'
import { Toaster } from "react-hot-toast";

const vazir = Vazirmatn({
  subsets: ["latin", "arabic"],
  variable: "--font-vazirmatn",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "E-commerce Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <Providers>
          <Toaster/>
          {children}
        </Providers>
      </body>
    </html>
  )
}