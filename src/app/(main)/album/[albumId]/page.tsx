import SongsList from "@/components/common/song-list/songs-list";
import DetailPageHeader from "@/components/common/detail-page-header";

import { getAlbumById } from "@/actions/get-album-by-id";
import { getArtistName } from "@/utils/common/helpers";

const AlbumIdPage = async ({
  params: { albumId },
}: {
  params: { albumId: string };
}) => {
  const data = await getAlbumById(albumId);

  return (
    <div>
      <DetailPageHeader
        id={data?.id}
        isAlbumHeader
        image={data?.image?.[2]?.link}
        name={data?.name}
        year={data?.year}
        artists={getArtistName(data?.primaryArtists ?? "Unknown Artist")}
        // needing to pass to reset the array after disabling shuffle
        songs={data?.songs ?? []}
        artistsId={data?.primaryArtistsId}
        songCount={data?.songCount ?? "0"}
      />
      <SongsList listId={data?.id} songs={data?.songs ?? []} />
    </div>
  );
};

export default AlbumIdPage;
