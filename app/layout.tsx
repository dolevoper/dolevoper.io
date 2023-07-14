import { PropsWithChildren } from "react";
import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import "./globals.css"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], fallback: ["Arial", "sans-serif"] });

export const metadata: Metadata = {
  title: "Dolevoper",
  description: "I'm Omer Dolev, a professional software developer.",
}

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
