"use client";

import { Plus } from "lucide-react";
import { UnstyledButton, Tooltip } from "@mantine/core";

import { useModal } from "../../hooks/use-modal-store";

const link = {
  label: "Add a server ",
  icon: Plus,
};

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => {
          onOpen("createServer");
        }}
        className="group flex items-center"
      >
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <link.icon
            className="group-hover:text-white transition text-emerald-500"
            size={25}
          />
        </div>
      </UnstyledButton>
    </Tooltip>
  );
};
