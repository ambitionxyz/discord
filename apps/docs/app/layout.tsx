import "@mantine/core/styles.css";
import "../styles/globals.css";

import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import AuthProvider from "../components/providers/AuthProvider";
import { theme } from "./theme";
import { cn } from "../lib/utils";

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}): JSX.Element {
  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
        <AuthProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
