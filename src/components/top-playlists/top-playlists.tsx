"use client";

import { Tabs, Tab } from "@nextui-org/react";

import AlbumPlaylistCard from "@/components/discover/album-playlist-card";

import {
  ENGLISH_PLAYLISTS,
  HINDI_PLAYLISTS,
  PUNJABI_PLAYLISTS,
} from "@/utils/common/playlists";
import ROUTES from "@/routes";

const TopPlaylists = () => {
  const tabs = [
    { name: "Hindi", data: HINDI_PLAYLISTS },
    { name: "Englihs", data: ENGLISH_PLAYLISTS },
    { name: "Punjabi", data: PUNJABI_PLAYLISTS },
  ];

  return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs
          size="lg"
          color="secondary"
          aria-label="Dynamic tabs"
          items={tabs}
        >
          {(item) => (
            <Tab key={item.name} title={item.name}>
              <div className="mt-4 grid justify-between place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {item.data.map((playlist) => (
                  <AlbumPlaylistCard
                    key={playlist.id}
                    name={playlist.title}
                    image={playlist.image}
                    href={`${ROUTES.PLAYLISTS}/${playlist.id}/#`}
                  />
                ))}
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default TopPlaylists;
