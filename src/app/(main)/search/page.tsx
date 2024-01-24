import { Suspense } from "react";
import SearchedResults from "@/components/search/searched-results-page";

const SearchPage = () => {
  return (
    <Suspense>
      <SearchedResults />
    </Suspense>
  );
};

export default SearchPage;
