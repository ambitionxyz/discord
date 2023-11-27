"use client";

import { format } from "date-fns";
import { ElementRef, Fragment, useRef } from "react";
import { Loader2, ServerCrash } from "lucide-react";

import { Member, Message, Profile } from "database";
import ChatItem from "./chat-item";
import { useChatQuery } from "../../hooks/use-chat-query";
import { useChatSocket } from "../../hooks/use-chat-socket";
import { useChatScroll } from "../../hooks/use-chat-scroll";
import { ChatWelcome } from "./chat-welcome";

interface ChatMessageProps {
  name: string;
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
  name,
  paramKey,
  paramValue,
  chatId,
  member,
}: ChatMessageProps) => {
  const queryKey = `chat: ${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const apiUrl = "/api/messages";
  

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({ queryKey, addKey });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
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
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1"></div>}
      {!hasNextPage && <ChatWelcome name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Loading previous messages
            </button>
          )}
        </div>
      )}
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
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
