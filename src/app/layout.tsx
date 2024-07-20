import React from "react";

import type { Metadata } from "next";
import { Providers } from "./providers";

import { Center } from '@chakra-ui/react';

import { Analytics } from "@vercel/analytics/react"

import { defaultFont } from './font';
import Header from "./header";

export const metadata: Metadata = {
  title: "@sumeetv",
  description: "Sumeet Vaidya's personal page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const divStyle: React.CSSProperties = {
    maxWidth: '860px',
    width: '100%',
  }

  return (
    <html lang="en">
      <body className={defaultFont.className}>
        <Providers>
          <Header />
          <Center p='1.5em'>
              <div style={divStyle}>
                <main>{children}</main>
              </div>
          </Center>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
