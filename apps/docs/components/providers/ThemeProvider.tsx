"use client";

import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";
import "@mantine/core/styles.css";

interface Props {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <MantineProvider forceColorScheme="light" defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
