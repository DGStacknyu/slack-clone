"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./getUserData";

export const createChannel = async ({
  workspaceId,
  name,
  userId,
}: {
  workspaceId: string;
  name: string;
  userId: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user Data" };
  }

  const { error, data: channelRecord } = await supabase
    .from("channels")
    .insert({
      name,
      workspace_id: workspaceId,
      user_id: userId,
    })
    .select("*");

  if (error) {
    return { error: "Insert Error" };
  }

  //update the channel members
  const [, updateChannelMembersError] = await updateChannelMembers(
    channelRecord[0].id,
    userId
  );

  if (updateChannelMembersError) {
    return { error: "Update members channel Error" };
  }

  //Add channel to user channels array
  const [, addChannelToUserError] = await addChannelToUserChannels(
    userData.id,
    channelRecord[0].id
  );

  if (addChannelToUserError) {
    return { error: "Add channel to user channels Error" };
  }

  //Add channel to workspace
  const [, updateWorkspaceChannelError] = await updateWorkspaceChannel(
    channelRecord[0].id,
    workspaceId
  );

  if (updateWorkspaceChannelError) {
    return { error: "Add channel to workspace Error" };
  }
};

const updateChannelMembers = async (channelId: string, userId: string) => {
  const supabase = await supabaseServerClient();

  const { data: updateChannelData, error: updateChannelError } =
    await supabase.rpc("update_channel_members", {
      new_member: userId,
      channel_id: channelId,
    });

  return [updateChannelData, updateChannelError];
};

const addChannelToUserChannels = async (channelId: string, userId: string) => {
  const supabase = await supabaseServerClient();

  const { data: addChannelData, error: addChannelDataError } =
    await supabase.rpc("update_user_channels", {
      user_id: userId,
      channel_id: channelId,
    });

  return [addChannelData, addChannelDataError];
};

const updateWorkspaceChannel = async (
  channelId: string,
  workspaceId: string
) => {
  const supabase = await supabaseServerClient();

  const { data: updateWorkSpaceData, error: updateWorkSpaceDataError } =
    await supabase.rpc("add_channel_to_workspace", {
      channel_id: channelId,
      workspace_id: workspaceId,
    });

  return [updateWorkSpaceData, updateWorkSpaceDataError];
};
