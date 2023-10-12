import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsBySearch = async (
  searchParam: string
): Promise<Song[]> => {
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

  const titleSearch = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${searchParam}%`)
    .order("created_at", { ascending: false });

  const authorSearch = await supabase
    .from("songs")
    .select("*")
    .ilike("author", `%${searchParam}%`)
    .order("created_at", { ascending: false });

  const titleResults = titleSearch.data || [];
  const authorResults = authorSearch.data || [];

  // Merge results and remove duplicates by song ID
  const mergedResults = [...titleResults, ...authorResults].reduce(
    (acc, song) => {
      if (!acc.find((s: { id: string }) => s.id === song.id)) {
        acc.push(song);
      }
      return acc;
    },
    [] as Song[]
  );

  return mergedResults;
};

export default getSongsBySearch;
