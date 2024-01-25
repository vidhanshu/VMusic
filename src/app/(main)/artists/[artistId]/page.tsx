import { type Metadata, type ResolvingMetadata } from "next";

import {
  getAlbumsByArtistId,
  getArtistById,
  getSongsByArtistId,
} from "@/actions";

import ArtistHeader from "@/components/common/detail-artist-header";
import SongsList from "@/components/common/song-list/songs-list";
import TrendingAlbums from "@/components/discover/trendings-albums";

import { decodeHTML } from "@/utils/common";

export async function generateMetadata(
  { params }: { params: { artistId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const album = await getArtistById(params.artistId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];
  const previousTwitterImages = (await parent).twitter?.images ?? [];

  const currentImage = album?.image?.[1]?.link ?? "/vmusic.svg";
  const title = decodeHTML(album?.name ?? "Unknown Artist") ?? "Unknown Artist";

  return {
    title,
    openGraph: {
      images: [currentImage, ...previousImages],
    },
    twitter: {
      title,
      images: [currentImage, ...previousTwitterImages],
    },
  };
}

const ArtistIdPage = async ({
  params: { artistId },
}: {
  params: { artistId: string };
}) => {
  const [artistData, songsData, artistAlbums] = await Promise.all([
    getArtistById(artistId),
    getSongsByArtistId(artistId),
    getAlbumsByArtistId(artistId),
  ]);

  return (
    <div className="space-y-8">
      <ArtistHeader artist={artistData} />
      <SongsList
        type="artist"
        pagination={{
          initialPage: 1,
          total: songsData?.total ?? 0,
        }}
        showPlayCount={false}
        listId={artistId}
        songs={songsData?.results ?? []}
      />
      {artistAlbums?.results?.length > 0 && (
        <TrendingAlbums
          title={`${artistData?.name}'s Albums`}
          albums={artistAlbums?.results ?? []}
        />
      )}
    </div>
  );
};

export default ArtistIdPage;
