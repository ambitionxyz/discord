import "@mantine/core/styles.css";
import "./globals.css";

import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import { cn } from "../lib/utils";
import { theme } from "./theme";
import AuthProvider from "../components/providers/AuthProvider";
import { ModalProvider } from "../components/providers/model-provider";
import { SocketProvider } from "../components/providers/socket-provider";

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
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
