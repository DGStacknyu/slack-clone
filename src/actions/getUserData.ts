import { supabaseServerClient } from "@/supabase/supabaseServer";
import supabaseServerClientPages from "@/supabase/supabaseServerPages";
import { User } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export const getUserData = async (): Promise<User | null> => {
  const supabase = await supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No user found");
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.error(error);
    return null;
  }

  return data ? data[0] : null;
};

export const getUserDataPages = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | null> => {
  const supabase = supabaseServerClientPages(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No user found");
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.error(error);
    return null;
  }

  return data ? data[0] : null;
};
