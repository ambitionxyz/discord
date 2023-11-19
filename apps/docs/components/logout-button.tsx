"use client";

import { UnstyledButton } from "@mantine/core";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <UnstyledButton
      onClick={() => {
        signOut();
      }}
    >
      <LogOut size={30} strokeWidth={2.25} absoluteStrokeWidth />
    </UnstyledButton>
  );
};

export default LogoutButton;
