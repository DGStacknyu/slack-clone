import { getUserData } from "@/actions/getUserData";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/auth");
  }

  const userWorkspaceId = userData?.workspaces?.[0];

  if (!userWorkspaceId) return redirect("/create-workspace");
  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`);

  return <div>Welcome to Slack Clone</div>;
}
