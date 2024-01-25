"use client";

import axios from "axios";
import { Download } from "lucide-react";
import React, { useState } from "react";
import { Button, CircularProgress, Tooltip } from "@nextui-org/react";

import { getMusicUrl } from "@/utils/common";

import type NSMusic from "@/music";
import { useMediaQuery } from "usehooks-ts";

const SongDownloader = ({ song }: { song: NSMusic.IMusic }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
        link.download = `${song.name}-${
          song.primaryArtists instanceof Array
            ? song.primaryArtists.join(", ")
            : song.primaryArtists
        }`;
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
            size={isMobile ? "sm" : "md"}
            color="success"
            value={downloadProgress}
          />
        </div>
      ) : (
        <Tooltip content={downloading ? "downloading" : "download"}>
          <Button
            variant="solid"
            radius="full"
            color="success"
            disabled={downloading}
            size={isMobile ? "sm" : "md"}
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
