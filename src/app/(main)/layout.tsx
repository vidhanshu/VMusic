import { getHomeData } from "@/actions";
import CommonLayout from "@/components/common/common-layout";
import { Suspense } from "react";

const MainLayout = async ({ children }: React.PropsWithChildren) => {
  const data = await getHomeData();

  return (
    <Suspense>
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
    </Suspense>
  );
};

export default MainLayout;
