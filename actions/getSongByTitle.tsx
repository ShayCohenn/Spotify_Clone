import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (searchParam: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!searchParam) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data: sessiosData, error: sessiosError } =
    await supabase.auth.getSession();

  if (sessiosError) {
    console.log(sessiosError.message);
    return [];
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${searchParam}%`)
    .order("created_at", { ascending: false });

  error && console.log(error.message);

  return (data as any) || [];
};

export default getSongsByTitle;