import React from "react";
import { signIn } from "next-auth/react";

import { currentProfile } from "../../../../../../lib/current-profile";
import { ServerSidebar } from "../../../../../../components/server/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return signIn();
  }

  return (
    <div className="w-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60"> {children}</main>
    </div>
  );
};

export default ServerIdLayout;
