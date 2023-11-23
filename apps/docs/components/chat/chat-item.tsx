"use client";

import { Avatar, Tooltip } from "@mantine/core";
import { ShieldAlert } from "lucide-react";
import { cn } from "../../lib/utils";

const ChatItem = () => {
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div
        onClick={undefined}
        className="cursor-pointer hover:drop-shadow-md transition"
      >
        <Avatar />
      </div>
      <div className="flex flex-col w-full ml-2">
        <div className="flex items-center gap-x-2 ">
          <div className="flex items-center">
            <p
              onClick={undefined}
              className="font-semibold text-sm hover:underline cursor-pointer"
            >
              Luận HQ
            </p>
            <Tooltip label="Admin">
              <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
            </Tooltip>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            2h:50p
          </span>
        </div>
        <p
          className={cn(
            "text-sm text-zinc-600 dark:text-zinc-300"
            // true && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
          )}
        >
          aalaosasasas
          {/* {true && (
            <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
              (edited)
            </span>
          )} */}
        </p>
      </div>
    </div>
  );
};

export default ChatItem;
