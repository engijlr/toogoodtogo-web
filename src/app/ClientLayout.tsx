"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import StoreProvider from "./StoreProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </StoreProvider>
  );
}
