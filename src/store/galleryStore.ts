import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PicsumImage } from "../types";
import { STORAGE_KEYS } from "../utils/storageKeys";

interface GalleryState {
  favorites: Record<string, PicsumImage>;
  toggleFavorite: (image: PicsumImage) => void;
  isFavorite: (imageId: string) => boolean;
  removeFavorite: (imageId: string) => void;
}

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set, get) => ({
      favorites: {},

      toggleFavorite: (image) => {
        const { favorites } = get();
        const next = { ...favorites };

        if (next[image.id]) {
          delete next[image.id];
        } else {
          next[image.id] = image;
        }

        set({ favorites: next });
      },

      isFavorite: (imageId) => {
        return Boolean(get().favorites[imageId]);
      },

      removeFavorite: (imageId) => {
        const next = { ...get().favorites };

        delete next[imageId];

        set({ favorites: next });
      },
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);