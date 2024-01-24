import ArtistHeader from "@/components/common/detail-artist-header";
import { getArtist } from "@/actions/get-artist-by-id";
import { getSongsByArtistId } from "@/actions/get-artist-songs";
import SongsList from "@/components/common/song-list/songs-list";
import TrendingAlbums from "@/components/discover/trendings-albums";
import { getAlbumsByArtistId } from "@/actions/get-artist-albums";

const ArtistIdPage = async ({
  params: { artistId },
}: {
  params: { artistId: string };
}) => {
  const [artistData, songsData, artistAlbums] = await Promise.all([
    getArtist(artistId),
    getSongsByArtistId(artistId),
    getAlbumsByArtistId(artistId),
  ]);

  return (
    <div className="space-y-8">
      <ArtistHeader artist={artistData} />
      <SongsList
        showPlayCount={false}
        listId={artistId}
        songs={songsData?.results ?? []}
      />
      <TrendingAlbums title={`${artistData?.name}'s Albums`} albums={artistAlbums?.results ?? []} />
    </div>
  );
};

export default ArtistIdPage;
