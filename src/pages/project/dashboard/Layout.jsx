import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import StyledComponentsRegistry from "../lib/styled-components-registry";
import "./globals.css";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <StyledComponentsRegistry>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}
