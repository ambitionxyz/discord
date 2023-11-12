import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
// export const changeThem = (value?: ColorScheme)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<any>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
  });
  const toggleColorScheme = (value?: any) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeScript forceColorScheme={colorScheme}>
      <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
    </ColorSchemeScript>
  );
};
