import React from "react";

import type { Metadata } from "next";
import { Providers } from "./providers";

import { Analytics } from "@vercel/analytics/react";

import Header from "./header";

export const metadata: Metadata = {
  title: "Chord Finder — Your pocket guitar workbench",
  description:
    "Find guitar chords and scales by selecting notes on an interactive fretboard. Explore alternate tunings and discover your next shape.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <a className="cf-skip-link" href="#main">
            Skip to fretboard
          </a>
          <Header />
          <main id="main">{children}</main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
