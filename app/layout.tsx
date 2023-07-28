import { PropsWithChildren } from "react";
import type { Metadata } from "next"
import { Oswald, Lora } from "next/font/google"
import Header from "./Header";

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
  description: "I'm Omer Dolev, a professional software developer.",
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
