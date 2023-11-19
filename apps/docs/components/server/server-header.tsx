"use client";

import { NavLink } from "@mantine/core";
import { UserPlus, Users } from "lucide-react";

import { MemberRole } from ".prisma/client";
import { ServerWithMembersWithProfiles } from "../../types";
import { useModal } from "../../hooks/use-modal-store";

import classes from "./server-header.module.css";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div className={classes.header}>
      <NavLink
        label={server.name}
        childrenOffset={0}
        className="h-12 w-full text-md font-semibold "
      >
        <NavLink
          onClick={() => onOpen("invite", { server: server })}
          label="Invite People"
          leftSection={<UserPlus className="h-4 w-4 ml-auto" />}
        />
        {isAdmin && (
          <NavLink
            onClick={() => onOpen("invite", { server: server })}
            label="Manage Members"
            leftSection={<Users className="h-4 w-4 ml-auto" />}
          />
        )}
      </NavLink>
    </div>
  );
};
export default ServerHeader;
