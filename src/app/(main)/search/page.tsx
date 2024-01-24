import { Suspense } from "react";
import SearchedResults from "@/components/search/searched-results-page";

export const metadata = {
  title: "Search page",
  description: "Search songs, artists, albums, playlists, podcasts, and more",
};

const SearchPage = () => {
  return (
    <Suspense>
      <SearchedResults />
    </Suspense>
  );
};

export default SearchPage;
