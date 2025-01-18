"use client";

import axios from "axios";
import { Download } from "lucide-react";
import React, { type PropsWithChildren, useState } from "react";
import { Button, CircularProgress, Tooltip } from "@nextui-org/react";

import { getArtistsNames, getMusicUrl } from "@/utils/common";

import type NSMusic from "@/music";

const SongDownloader = ({
  song,
  children,
}: { song: NSMusic.IMusic } & PropsWithChildren) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    setDownloading(true);
    axios<Blob | MediaSource>({
      url: getMusicUrl(song.downloadUrl),
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const progress = Math.floor(
          (progressEvent.loaded / (progressEvent.total ?? 1)) * 100,
        );
        setDownloadProgress(progress);
      },
    })
      .then((response) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.data);
        link.download = `${song.name}-${getArtistsNames(song.artists)}`;
        link.click();
      })
      .catch((error) => {
        console.error(error);
        setDownloading(false);
        setDownloadProgress(0);
      })
      .finally(() => {
        setDownloading(false);
        setDownloadProgress(0);
      });
  };

  return (
    <>
      {downloading ? (
        <div>
          <CircularProgress
            aria-label="download-progress"
            showValueLabel
            size="sm"
            color="success"
            value={downloadProgress}
          />
        </div>
      ) : children ? (
        <div onClick={handleDownload}>{children}</div>
      ) : (
        <Tooltip content={downloading ? "downloading" : "download"}>
          <Button
            variant="solid"
            radius="full"
            color="success"
            disabled={downloading}
            size="sm"
            isIconOnly
            onClick={handleDownload}
            startContent={<Download size={16} className="text-white" />}
          />
        </Tooltip>
      )}
    </>
  );
};

export default SongDownloader;
