import { Hash } from "lucide-react";

import { cn } from "../../lib/utils";
import SocketIndicator from "../socket-indicator";

import classes from "./chat-header.module.css";

interface ChatHeaderProps {
  name: string;
  serverId: string;
  type: string;
}

const ChatHeader = ({ name, serverId, type }: ChatHeaderProps) => {
  return (
    <div
      className={cn(
        "text-md font-semibold px-3 flex items-center h-12 box-content",
        classes.chat
      )}
    >
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
