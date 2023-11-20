import { redirect } from "next/navigation";

import { ChannelType, MemberRole } from "@prisma/client";
import { db } from "../../lib/db";
import { currentProfile } from "../../lib/current-profile";
import ServerHeader from "./server-header";
import { ScrollArea } from "@mantine/core";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerSearch } from "./server-search";

interface ServerSideBarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 2-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 2-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 2-4" />,
};

const roleMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

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

  const textChannels = server?.Channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannels = server?.Channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannels = server?.Channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.Members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.Members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex flex-col h-full w-full text-primary dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 !px-3">
        <div className="mt-2 ">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleMap[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};