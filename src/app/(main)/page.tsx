import HeroCard from "@/components/discover/hero-card";
import LatestReleases from "@/components/discover/latest-releases";
import TopCharts from "@/components/discover/top-charts";
import TrendingsAlbums from "@/components/discover/trendings-albums";
import YouMayLike from "@/components/discover/you-may-like";
import TopPlaylists from "@/components/discover/top-playlists";

export default function HomePage() {
  return (
    <div>
      <HeroCard />
      <TrendingsAlbums />
      <YouMayLike />
      <LatestReleases />
      <TopCharts />
      <TopPlaylists/>
    </div>
  );
}
