import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

import { db } from "../../../../../../../../lib/db";
import { currentProfile } from "../../../../../../../../lib/current-profile";
import ChatHeader from "../../../../../../../../components/chat/chat-header";
import ChatMessages from "../../../../../../../../components/chat/chat-messages";
import ChatInput from "../../../../../../../../components/chat/chat-input";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const Page = async ({ params }: ChannelIdPageProps) => {
  const { serverId, channelId } = params;

  const profile = await currentProfile();

  if (!profile) {
    return signIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
};

export default Page;
