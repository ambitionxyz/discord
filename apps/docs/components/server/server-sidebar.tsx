import { redirect } from "next/navigation";

import { db } from "../../lib/db";
import { currentProfile } from "../../lib/current-profile";
import ServerHeader from "./server-header";

interface ServerSideBarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      Channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      Members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const role = server.Members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex flex-col h-full w-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};
