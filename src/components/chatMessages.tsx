import { UseChatFeatcher } from "@/hooks/useChatFeatcher";
import { Channel, User, Workspace } from "@/types/app";
import { ElementRef, FC, useRef } from "react";
import DotAnimatedLoader from "./DotLoader";
import ChatItem from "./chatItem";
import { format } from "date-fns";
import { useChatScrollHandler } from "@/hooks/useChatScrollHandler";
import { useChatSocketConnection } from "@/hooks/useChatSocketConnection";
const DATE_FORMAT = "d MMM yyy, HH:mm";

type ChatMessagesProps = {
  userData: User;
  chatId: string;
  socketUrl: string;
  apiUrl: string;
  name: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  type: "Channel" | "DirectMessage";
  workspaceData: Workspace;
  channelData?: Channel;
};

const ChatMessages: FC<ChatMessagesProps> = ({
  apiUrl,
  chatId,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
  userData,
  workspaceData,
  channelData,
}) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const queryKey =
    type === "Channel" ? `Channel:${chatId}` : `direct_messages:${chatId}`;
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    UseChatFeatcher({
      apiUrl,
      pageSize: 10,
      paramKey,
      paramValue,
      queryKey,
    });
  useChatSocketConnection({
    queryKey,
    addKey:
      type === "Channel"
        ? `${queryKey}:channel-messages`
        : `direct_messages:post`,
    updateKey:
      type === "Channel"
        ? `${queryKey}:channel-messaegs:update`
        : `direct_messages:update`,
    paramValue,
  });
  useChatScrollHandler({
    chatRef,
    bottomRef,
    count: data?.pages?.[0].data?.length ?? 0,
  });
  if (status === "pending") {
    return <DotAnimatedLoader />;
  }
  if (status === "error") {
    return <div>Error Occur!</div>;
  }

  const renderMessages = () =>
    data.pages.map((page) =>
      page.data.map((message) => (
        <ChatItem
          key={message.id}
          currentUser={userData}
          user={message.user}
          content={message.content}
          fileUrl={message.file_url}
          deleted={message.is_deleted}
          id={message.id}
          timestamp={format(new Date(message.created_at), DATE_FORMAT)}
          isUpdated={message.updated_at !== message.created_at}
          socketUrl={socketUrl}
          socketQuery={socketQuery}
          channelData={channelData}
        />
      ))
    );
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
    </div>
  );
};

export default ChatMessages;
