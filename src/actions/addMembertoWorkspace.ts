import { supabaseServerClient } from "@/supabase/supabaseServer";

export const addMembertoWorkspace = async (
  userId: string,
  workspaceId: number
) => {
  const supabase = await supabaseServerClient();
  // Update the workspace members

  const { data: addMemberWorkspaceData, error: addMemberWorkspaceError } =
    await supabase.rpc("add_member_to_workspace", {
      user_id: userId,
      workspace_id: workspaceId,
    });

  return [addMemberWorkspaceData, addMemberWorkspaceError];
};
