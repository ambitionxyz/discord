"use client";

import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { format } from "date-fns";

import { Member, Message, Profile } from "database";
import ChatItem from "./chat-item";
import { useChatQuery } from "../../hooks/use-chat-query";

interface ChatMessageProps {
  paramKey: string;
  paramValue: string;
  chatId: string;
  member: Member;
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const DATE_FORMAT = "d MMM yyy, HH:mm";

const ChatMessages = ({
  paramKey,
  paramValue,
  chatId,
  member,
}: ChatMessageProps) => {
  const queryKey = `chat: ${chatId}`;
  const apiUrl = "/api/messages";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-50 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-50 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => {
              return (
                <ChatItem
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  member={message.member}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
