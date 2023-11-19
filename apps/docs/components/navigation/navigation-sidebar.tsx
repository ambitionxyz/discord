import { redirect } from "next/navigation";
import { Avatar, ScrollArea, Tooltip, UnstyledButton } from "@mantine/core";

import { db } from "../../lib/db";
import { currentProfile } from "../../lib/current-profile";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import LogoutButton from "../logout-button";
import ModeToggle from "../mode-toggle";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <div className=" block h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <Tooltip
          label={profile.email}
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <UnstyledButton className="h-[48px] w-[48px]">
            <Avatar size={48} src={profile.imageUrl} />
          </UnstyledButton>
        </Tooltip>

        <Tooltip
          label="Logout"
          position="right"
          transitionProps={{ duration: 0 }}
        >
          <LogoutButton />
        </Tooltip>
      </div>
    </div>
  );
};
