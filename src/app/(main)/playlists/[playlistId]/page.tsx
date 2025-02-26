import SongsList from "@/components/common/song-list/songs-list";
import DetailPageHeader from "@/components/common/detail-page-header";
import { type Metadata, type ResolvingMetadata } from "next";

import { getPlaylistById } from "@/actions/saavn";
import { decodeHTML, getMusicImageUrl } from "@/utils/common";

export async function generateMetadata(
  { params }: { params: { playlistId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const playlist = await getPlaylistById(params.playlistId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  const currentImage = getMusicImageUrl(playlist?.image) ?? "/vmusic.svg";

  return {
    title: decodeHTML(playlist?.name ?? "Unknown Playlist"),
    openGraph: {
      images: [currentImage, ...previousImages],
    },
    twitter: {
      title:
        decodeHTML(playlist?.name ?? "Unknown Playlist") ?? "Unknown Playlist",
      images: [currentImage, ...previousImages],
    },
  };
}

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
        image={getMusicImageUrl(data?.image)}
        name={data?.name}
        year={data?.type}
        songCount={data?.songCount ?? "0"}
        songs={data?.songs ?? []}
      />
      <SongsList type="playlist" listId={data?.id} songs={data?.songs ?? []} />
    </div>
  );
};

export default PlaylistIdPage;
