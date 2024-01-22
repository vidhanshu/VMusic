import React from "react";

const PlaylistIdPage = ({
  params: { playlistId },
}: {
  params: { playlistId: string };
}) => {
  return <div>{playlistId}</div>;
};

export default PlaylistIdPage;
