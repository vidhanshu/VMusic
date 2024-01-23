import SongsList from "@/components/common/song-list/songs-list";
import DetailPageHeader from "@/components/common/detail-page-header";

import { getPlaylistById } from "@/actions/get-playlist-by-id";

const PlaylistIdPage = async ({
  params: { playlistId },
}: {
  params: { playlistId: string };
}) => {
  const data = await getPlaylistById(playlistId);

  return (
    <div>
      <DetailPageHeader
        id={data?.id}
        image={data?.image?.[2]?.link}
        name={data?.name}
        year={data?.type}
        followers={data?.followerCount}
        songCount={data?.songCount ?? "0"}
        songs={data?.songs ?? []}
      />
      <SongsList listId={data?.id} songs={data?.songs ?? []} />
    </div>
  );
};

export default PlaylistIdPage;
