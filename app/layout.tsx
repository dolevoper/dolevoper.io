import { PropsWithChildren } from "react";
import type { Metadata } from "next"
import { Oswald, Lora } from "next/font/google"
import Header from "./Header";
import { description } from "./page";

import "./globals.css"

const oswald = Oswald({
  variable: "--font-headings",
  subsets: ["latin"],
  weight: ["500", "700"],
  fallback: ["Arial", "sans-serif"]
});
const lora = Lora({
  variable: "--font-text",
  subsets: ["latin"],
  weight: ["400", "500"],
  fallback: ["Times New Roman", "serif"]
});

export const metadata: Metadata = {
  title: "Dolevoper",
  description,
}

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${lora.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
