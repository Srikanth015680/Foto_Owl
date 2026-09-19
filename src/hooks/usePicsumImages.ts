import { useCallback, useEffect, useRef, useState } from "react";

import { ApiError, fetchImages } from "../services/api";
import { PicsumImage } from "../types";

const PAGE_SIZE = 20;

interface UsePicsumImagesResult {
  images: PicsumImage[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function usePicsumImages(): UsePicsumImagesResult {
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const isFetchingRef = useRef(false);

  const runFetch = useCallback(
    async (
      targetPage: number,
      mode: "initial" | "more" | "refresh"
    ) => {
      if (isFetchingRef.current) {
        return;
      }

      isFetchingRef.current = true;

      if (mode === "initial") {
        setIsLoading(true);
      }

      if (mode === "more") {
        setIsLoadingMore(true);
      }

      if (mode === "refresh") {
        setIsRefreshing(true);
      }

      setError(null);

      try {
        const pageImages = await fetchImages(targetPage, PAGE_SIZE);

        setHasMore(pageImages.length === PAGE_SIZE);

        setImages((previousImages) => {
          if (mode === "initial" || mode === "refresh") {
            return pageImages;
          }

          return [...previousImages, ...pageImages];
        });

        setPage(targetPage);
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Something went wrong.";

        setError(message);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        setIsRefreshing(false);
        isFetchingRef.current = false;
      }
    },
    []
  );

  useEffect(() => {
    runFetch(1, "initial");
  }, [runFetch]);

  const loadMore = useCallback(() => {
    if (isFetchingRef.current || !hasMore) {
      return;
    }

    runFetch(page + 1, "more");
  }, [hasMore, page, runFetch]);

  const refresh = useCallback(() => {
    if (isFetchingRef.current) {
      return;
    }

    setHasMore(true);
    runFetch(1, "refresh");
  }, [runFetch]);

  return {
    images,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}