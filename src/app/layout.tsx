import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

import { Center } from '@chakra-ui/react';

import Header from "./header";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

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
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Center p='1.5em'>
              <div style={divStyle}>
                <main>{children}</main>
              </div>
          </Center>
        </Providers>
      </body>
    </html>
  );
}
