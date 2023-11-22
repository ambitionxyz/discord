"use client";

import { Plus } from "lucide-react";
import { Tooltip } from "@mantine/core";

import { ChannelType, MemberRole } from "database";

interface ServerSectionProps {
  sectionType: "channels";
  channelType: ChannelType;
  role?: MemberRole;
  label: string;
}

const ServerSection = ({
  sectionType,
  channelType,
  role,
  label,
}: ServerSectionProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType == "channels" && (
        <Tooltip label="Create Channel" position="top">
          <button
            onClick={() => {}}
            className="border-none bg-transparent text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default ServerSection;
