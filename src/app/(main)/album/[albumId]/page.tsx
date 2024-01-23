import React from "react";
import { getAlbumById } from "@/actions/get-album-by-id";
import SongsList from "@/components/common/song-list/songs-list";
import DetailPageHeader from "@/components/common/detail-page-header";

const AlbumIdPage = async ({
  params: { albumId },
}: {
  params: { albumId: string };
}) => {
  const data = await getAlbumById(albumId);

  return (
    <div>
      <DetailPageHeader
        image={data?.image?.[2]?.link}
        name={data?.name}
        year={data?.year}
        artists={
          data?.primaryArtists instanceof Array
            ? data?.primaryArtists.join(", ")
            : data?.primaryArtists
        }
        artistsId={data?.primaryArtistsId}
        songCount={data?.songCount ?? "0"}
      />
      <SongsList songs={data?.songs ?? []} />
    </div>
  );
};

export default AlbumIdPage;
