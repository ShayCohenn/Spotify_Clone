import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserID = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: sessiosData, error: sessiosError } =
    await supabase.auth.getSession();

  if (sessiosError) {
    console.log(sessiosError.message);
    return [];
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessiosData.session?.user.id)
    .order("created_at", { ascending: false });

  error && console.log(error.message);

  return (data as any) || [];
};

export default getSongsByUserID;
