import React from "react";

const ArtistIdPage = ({
  params: { artistId },
}: {
  params: { artistId: string };
}) => {
  return <div>Artist: {artistId}</div>;
};

export default ArtistIdPage;
