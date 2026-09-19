import { useMemo, useState } from "react";

import { FilterOption, PicsumImage } from "../types";
import { useDebouncedValue } from "./useDebouncedValue";

interface UseImageSearchResult {
  query: string;
  setQuery: (value: string) => void;
  filter: FilterOption;
  setFilter: (value: FilterOption) => void;
  results: PicsumImage[];
}

function matchesFilter(
  author: string,
  filter: FilterOption
): boolean {
  if (filter === "all") {
    return true;
  }

  const firstLetter = author.trim().charAt(0).toUpperCase();

  if (filter === "a-m") {
    return firstLetter >= "A" && firstLetter <= "M";
  }

  return firstLetter >= "N" && firstLetter <= "Z";
}

export function useImageSearch(
  images: PicsumImage[]
): UseImageSearchResult {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");

  const debouncedQuery = useDebouncedValue(query);

  const results = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return images.filter((image) => {
      const matchesQuery = normalizedQuery
        ? image.author.toLowerCase().includes(normalizedQuery)
        : true;

      return matchesQuery && matchesFilter(image.author, filter);
    });
  }, [images, debouncedQuery, filter]);

  return {
    query,
    setQuery,
    filter,
    setFilter,
    results,
  };
}