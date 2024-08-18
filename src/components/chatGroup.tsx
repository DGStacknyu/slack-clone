"use client";
import { Channel, User, Workspace } from "@/types/app";
import ChatHeader from "@/components/chatHeader";
import InfoSection from "@/components/InfoSection";
import Sidebar from "./sidebar";
import Typography from "@/components/ui/typography";
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import TextEditor from "./textEditor";
import ChatMessages from "@/components/chatMessages";

type ChatGroupProps = {
  type: "Channel" | "DirectMessage";
  socketUrl: string;
  apiUrl: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "recipientId";
  paramValue: string;
  userData: User;
  currentWorkspaceData: Workspace;
  currentChannelData: Channel | undefined;
  userWorkspaceData: Workspace[];
  userWorkspaceChannels: Channel[];
  slug: string;
};

const ChatGroup: FC<ChatGroupProps> = ({
  apiUrl,
  chatId,
  headerTitle,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
  currentChannelData,
  currentWorkspaceData,
  slug,
  userData,
  userWorkspaceChannels,
  userWorkspaceData,
}) => {
  const searchParams = useSearchParams();

  return (
    <div className="hidden md:block">
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceData={userWorkspaceData as Workspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId={
            type === "Channel" ? currentChannelData?.id : undefined
          }
        />
        <div className="p-4 relative w-full overflow-hidden ">
          <ChatHeader title={headerTitle} chatId={chatId} userData={userData} />
          <div className="mt-10">
            <ChatMessages
              userData={userData}
              name={currentChannelData?.name ?? "USERNAME"}
              workspaceData={currentWorkspaceData}
              chatId={chatId}
              type={type}
              socketQuery={socketQuery}
              paramKey={paramKey}
              paramValue={paramValue}
              socketUrl={socketUrl}
              apiUrl={apiUrl}
              channelData={currentChannelData}
            />
          </div>
        </div>
      </div>
      <div className="m-4">
        <TextEditor
          apiUrl={socketUrl}
          channel={currentChannelData}
          type={type}
          userData={userData}
          workspaceData={currentWorkspaceData}
          recipientId={type === "DirectMessage" ? chatId : undefined}
        />
      </div>
    </div>
  );
};

export default ChatGroup;
