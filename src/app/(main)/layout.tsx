import { getHomeData } from "@/actions";
import CommonLayout from "@/components/common/common-layout";

const MainLayout = async ({ children }: React.PropsWithChildren) => {
  const data = await getHomeData();

  return (
    <CommonLayout
      data={{
        newReleases: data?.albums ?? [],
        topCharts: data?.charts ?? [],
        topArtists: [],
        topPlaylists: data?.playlists ?? [],
        trending: {
          songs: data?.trending?.songs ?? [],
          albums: data?.trending?.albums ?? [],
        },
      }}
    >
      {children}
    </CommonLayout>
  );
};

export default MainLayout;
