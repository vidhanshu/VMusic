/* eslint-disable */

"use client";

import type NSMusic from "@/music";
import { Search } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";


import search from "@/actions/search";
import SearchedSongs from "./searched-songs";
import SearchLoadingSkeleton from "./search-loading-skeleton";
import SearchedAlbums from "./searched-albums";
import SearchedPlaylists from "./searched-playlists";
import SearchedArtists from "./searched-artists";
import Typography from "@/components/common/Typography";

import { DEFAULT_SEARCH_ALL_VAL } from "@/utils/common/constants";

const SearchedResults = () => {
  const [results, setResults] = useState<NSMusic.ISearchAllType>(
    DEFAULT_SEARCH_ALL_VAL,
  );
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  function handleSearchChange(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const onSearch = async () => {
    setLoading(true);
    const res = await search(q);
    setResults(res);
    setLoading(false);
  };

  useEffect(() => {
    if (q) {
      // eslint-disable-next-line
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <input
          defaultValue={q}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              await onSearch();
            }
          }}
          className="flex-grow self-stretch rounded-md bg-secondary/20 px-4 focus:outline-none"
          placeholder="Search song, artist, album...."
        />
        <Button
          isIconOnly
          startContent={<Search size={16} />}
          onClick={onSearch}
          className="ml-4"
          color="secondary"
          variant="flat"
        />
      </div>
      {loading ? (
        <SearchLoadingSkeleton />
      ) : !q ? (
        <div className="flex items-center justify-center py-8">
          <Typography variant="T_Bold_H3" color="secondary">
            Search for your favorite songs, artists, albums, playlists...
          </Typography>
        </div>
      ) : (
        <>
          {results.topQuery.results.length ? (
            <div className="py-8">
              <Typography color="secondary" variant="T_Medium_H5">
                Top Results for <span className="text-success">{q}</span>
              </Typography>
              <SearchedSongs songs={results.topQuery.results} />
            </div>
          ) : null}
          {results.songs.results.length ? (
            <div>
              <Typography color="secondary" variant="T_Medium_H5">
                Songs for <span className="text-success">{q}</span>
              </Typography>
              <SearchedSongs songs={results.songs.results} />
            </div>
          ) : null}
          {results.albums.results.length ? (
            <SearchedAlbums albums={results.albums.results} />
          ) : null}
          {results.playlists.results.length ? (
            <SearchedPlaylists playlists={results.playlists.results} />
          ) : null}
          {results.artists.results.length ? (
            <SearchedArtists artists={results.artists.results} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default SearchedResults;
