import { getUserData } from "@/actions/getUserData";
import { getUserWorkspaceChannels } from "@/actions/getUserWorkspaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspace";
import ChatGroup from "@/components/chatGroup";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const ChannelId = async ({
  params: { workspaceId, channelId },
}: {
  params: {
    workspaceId: string;
    channelId: string;
  };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect("/auth");

  const [userworkspaceData] = await getUserWorkspaceData(userData.workspaces!);
  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  const currentChannelData = userWorkspaceChannels.find(
    (channel) => channel.id === channelId
  );

  if (!currentChannelData) return redirect(`/`);
  return (
    <div className="hidden md:block">
      <ChatGroup
        userData={userData}
        type="Channel"
        currentChannelData={currentChannelData}
        currentWorkspaceData={currentWorkspaceData}
        slug={workspaceId}
        chatId={channelId}
        userWorkspaceChannels={userWorkspaceChannels}
        socketUrl="/api/web-socket/messages"
        socketQuery={{
          channelId: currentChannelData.id,
          workspaceId: currentWorkspaceData.id,
        }}
        apiUrl="/api/messages"
        headerTitle={currentChannelData.name}
        paramKey="channelId"
        paramValue={channelId}
        userWorkspaceData={userworkspaceData as UserWorkspace[]}
      />
    </div>
  );
};

export default ChannelId;
