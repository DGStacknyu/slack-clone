"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./getUserData";
import { updateUserworkSpace } from "./updateUserworkSpace";
import { addMembertoWorkspace } from "./addMembertoWorkspace";

export const createWorkspace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl?: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "User not found" };
  }

  const { data: workspaceRecord, error } = await supabase
    .from("workspaces")
    .insert({
      image_url: imageUrl,
      name,
      super_admin: userData.id,
      slug,
      invite_code,
    })
    .select("*");

  if (error) {
    return { error };
  }

  const [updateWorkspaceData, updateWorkspaceError] = await updateUserworkSpace(
    userData.id,
    workspaceRecord[0].id
  );

  if (updateWorkspaceError) {
    return { updateWorkspaceError };
  }

  //   Add user to workspace members
  const [addMemberWorkspaceData, addMemberWorkspaceError] =
    await addMembertoWorkspace(userData.id, workspaceRecord[0].id);

  if (addMemberWorkspaceError) {
    return { error: addMemberWorkspaceError };
  }
};
