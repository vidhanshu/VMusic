/* eslint-disable */

"use client";

import type NSMusic from "@/music";
import { Search } from "lucide-react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import SearchedSongs from "./searched-songs";
import SearchLoadingSkeleton from "./search-loading-skeleton";
import SearchedAlbums from "./searched-albums";
import SearchedPlaylists from "./searched-playlists";
import SearchedArtists from "./searched-artists";
import Typography from "@/components/common/Typography";

import { searchByQuery } from "@/actions";

import { DEFAULT_SEARCH_ALL_VAL } from "@/utils/common";
import { useLocalStorage } from "usehooks-ts";

const SearchedResults = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    [],
  );
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
    if (!q || !q.length) return;
    setLoading(true);
    const res = await searchByQuery(q);
    setResults(res);
    setLoading(false);
    setRecentSearches((prev) => {
      if (prev.includes(q)) {
        return prev;
      }
      return [q, ...prev];
    });
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
      <div className="flex items-center gap-x-4">
        <div className="relative flex-grow">
          <Autocomplete
            size="sm"
            color="default"
            fullWidth
            className="rounded-md border border-primary"
            placeholder="Search song, artist, album...."
            allowsCustomValue
            onInputChange={(e) => {
              handleSearchChange(e);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await onSearch();
              }
            }}
          >
            {recentSearches.map((search) => (
              <AutocompleteItem key={search} value={search}>
                {search}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <button
            onClick={onOpen}
            className="absolute -bottom-6 left-0 text-xs font-thin underline"
          >
            clear history
          </button>
        </div>
        <Button
          isIconOnly
          startContent={<Search size={16} />}
          onClick={onSearch}
          className="h-12 w-12"
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
          {results?.topQuery?.results?.length ? (
            <div className="py-8">
              <Typography color="secondary" variant="T_Medium_H5">
                Top Results for <span className="text-success">{q}</span>
              </Typography>
              <SearchedSongs songs={results.topQuery.results} />
            </div>
          ) : null}
          {results?.songs?.results?.length ? (
            <div>
              <Typography color="secondary" variant="T_Medium_H5">
                Songs for <span className="text-success">{q}</span>
              </Typography>
              <SearchedSongs songs={results.songs.results} />
            </div>
          ) : null}
          {results?.albums?.results?.length ? (
            <SearchedAlbums albums={results.albums.results} />
          ) : null}
          {results?.playlists?.results?.length ? (
            <SearchedPlaylists playlists={results.playlists.results} />
          ) : null}
          {results?.artists?.results?.length ? (
            <SearchedArtists artists={results.artists.results} />
          ) : null}
        </>
      )}

      {/* confirm clear history modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
              <ModalBody>
                Are you sure you want to clear search history?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setRecentSearches([]);
                    onClose();
                  }}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchedResults;
