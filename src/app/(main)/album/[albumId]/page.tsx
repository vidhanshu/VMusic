import React from "react";

const AlbumIdPage = ({
  params: { albumId },
}: {
  params: { albumId: string };
}) => {
  return <div>Album: {albumId}</div>;
};

export default AlbumIdPage;
