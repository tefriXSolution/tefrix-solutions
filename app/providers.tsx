"use client";

import { MantineProvider } from "@mantine/core";

import { cssVariablesResolver, theme } from "./theme";

// Client boundary for MantineProvider: cssVariablesResolver is a function, so
// it can't be passed from the server-rendered root layout.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={cssVariablesResolver}
      forceColorScheme="dark"
    >
      {children}
    </MantineProvider>
  );
}
