"use client";

import { Tooltip, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "lucide-react";

const ModeToggle = () => {
  const { setColorScheme, clearColorScheme, colorScheme } =
    useMantineColorScheme();

  const isColorToggle = colorScheme === "dark" ? "light" : "dark";
  console.log(isColorToggle);
  return (
    <Tooltip
      label="switch mode"
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        variant="default"
        onClick={() => {
          setColorScheme(isColorToggle);
        }}
      >
        {isColorToggle === "dark" ? (
          <Sun strokeWidth={1.5} absoluteStrokeWidth />
        ) : (
          <Moon
            size={20}
            color="#f2f2f2"
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
        )}
      </UnstyledButton>
    </Tooltip>
  );
};

export default ModeToggle;
