import type { Metadata } from "next";
// Only Mantine's base layers: the site doesn't use Mantine's visual
// components, so the full 290 KB component stylesheet isn't needed.
import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/global.css";
import "./globals.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { GoogleAnalytics } from "./components/google-analytics";
import { fontVariables } from "./fonts";
import { rootMetadata } from "./lib/metadata";
import { siteConfig } from "./lib/site-config";
import { Providers } from "./providers";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      {...mantineHtmlProps}
      data-scroll-behavior="smooth"
      className={fontVariables}
    >
      <head>
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics measurementId={siteConfig.gaMeasurementId} />
        )}
      </body>
    </html>
  );
}
