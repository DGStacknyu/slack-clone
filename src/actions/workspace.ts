"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supabase = await supabaseServerClient();

  const { data: userWorkspaceData, error: userWorkspaceError } = await supabase

    .from("workspaces")
    .select("*")
    .in("id", workspaceIds);

  return [userWorkspaceData, userWorkspaceError];
};

export const getCurrentWorkspaceData = async (workspaceId: string) => {
  const supabase = await supabaseServerClient();

  const { data: currentWorkspaceData, error: currentWorkspaceError } =
    await supabase
      .from("workspaces")
      .select("*")
      .eq("id", workspaceId)
      .single();

  return [currentWorkspaceData, currentWorkspaceError];
};
