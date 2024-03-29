import SongsList from "@/components/common/song-list/songs-list";
import DetailPageHeader from "@/components/common/detail-page-header";

import { getAlbumById } from "@/actions/saavn";
import { decodeHTML, getArtistName } from "@/utils/common";
import { type Metadata, type ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { albumId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const album = await getAlbumById(params.albumId);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  const currentImage = album?.image?.[1]?.link ?? "/vmusic.svg";

  return {
    title: decodeHTML(album?.name ?? "Unknown Album"),
    openGraph: {
      images: [currentImage, ...previousImages],
    },
    twitter: {
      title: decodeHTML(album?.name ?? "Unknown Album") ?? "Unknown Album",
      images: [currentImage, ...previousImages],
    },
  };
}

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
      <SongsList type="album" listId={data?.id} songs={data?.songs ?? []} />
    </div>
  );
};

export default AlbumIdPage;
