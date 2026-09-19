import { Directory, File, Paths } from "expo-file-system";
import { Asset, requestPermissionsAsync } from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useState } from "react";

import { PicsumImage } from "../types";

interface UseImageDownloadResult {
  isDownloading: boolean;
  isSharing: boolean;
  downloadImage: (
    image: PicsumImage
  ) => Promise<{ success: boolean; message: string }>;
  shareImage: (
    image: PicsumImage
  ) => Promise<{ success: boolean; message: string }>;
}

function cacheDestination(fileName: string): File {
  return new File(new Directory(Paths.cache), fileName);
}

export function useImageDownload(): UseImageDownloadResult {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const downloadImage = async (image: PicsumImage) => {
    setIsDownloading(true);

    try {
      const permission = await requestPermissionsAsync();

      if (!permission.granted) {
        return {
          success: false,
          message: "Photo library permission is required to save images.",
        };
      }

      const destination = cacheDestination(`picsum-${image.id}.jpg`);

      const file = await File.downloadFileAsync(
        image.download_url,
        destination,
        {
          idempotent: true,
        }
      );

      await Asset.create(file.uri);

      return {
        success: true,
        message: "Image saved to your gallery.",
      };
    } catch {
      return {
        success: false,
        message: "Couldn't download this image. Please try again.",
      };
    } finally {
      setIsDownloading(false);
    }
  };

  const shareImage = async (image: PicsumImage) => {
    setIsSharing(true);

    try {
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        return {
          success: false,
          message: "Sharing isn't available on this device.",
        };
      }

      const destination = cacheDestination(
        `picsum-share-${image.id}.jpg`
      );

      const file = await File.downloadFileAsync(
        image.download_url,
        destination,
        {
          idempotent: true,
        }
      );

      await Sharing.shareAsync(file.uri);

      return {
        success: true,
        message: "",
      };
    } catch {
      return {
        success: false,
        message: "Couldn't share this image. Please try again.",
      };
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isDownloading,
    isSharing,
    downloadImage,
    shareImage,
  };
}