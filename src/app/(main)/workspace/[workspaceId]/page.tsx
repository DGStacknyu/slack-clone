import { getUserData } from "@/actions/getUserData";
import { getUserWorkspaceChannels } from "@/actions/getUserWorkspaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspace";
import InfoSection from "@/components/InfoSection";
import NoDataScreen from "@/components/NodataScreen";
import Sidebar from "@/components/sidebar";
import Typography from "@/components/ui/typography";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect("/auth");

  const [userworkspaceData] = await getUserWorkspaceData(userData.workspaces!);
  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  if (userWorkspaceChannels.length > 0) {
    redirect(
      `/workspace/${workspaceId}/channels/${userWorkspaceChannels[0].id}`
    );
  }
  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceData={userworkspaceData as UserWorkspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceChannels={userWorkspaceChannels}
          currentChannelId=""
        />
      </div>
      <NoDataScreen
        workspaceName={currentWorkspaceData.name}
        userId={userData.id}
        workspaceId={workspaceId}
      />
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;
