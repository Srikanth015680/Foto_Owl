import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { ImageCard } from "../../components/ImageCard";
import { ScreenContainer } from "../../components/ScreenContainer";
import { EmptyState } from "../../components/StatusViews";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useGalleryStore } from "../../store/galleryStore";
import { radius, spacing } from "../../theme/colors";
import { PicsumImage } from "../../types";
import { FavoritesStackParamList } from "../../navigation/types";

type FavoritesNavigationProp =
  NativeStackNavigationProp<
    FavoritesStackParamList,
    "FavoritesList"
  >;

const NUM_COLUMNS = 2;

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const { colors } = useAppTheme();

  const favorites = useGalleryStore((state) => state.favorites);
  const toggleFavorite = useGalleryStore(
    (state) => state.toggleFavorite
  );

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);

  const favoritesList = useMemo(
    () => Object.values(favorites),
    [favorites]
  );

  const results = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();

    if (!normalized) {
      return favoritesList;
    }

    return favoritesList.filter((image) =>
      image.author.toLowerCase().includes(normalized)
    );
  }, [favoritesList, debouncedQuery]);

  function renderItem({ item }: { item: PicsumImage }) {
    return (
      <ImageCard
        image={item}
        isFavorite
        onPress={() =>
          navigation.navigate("ImageDetails", {
            image: item,
          })
        }
        onToggleFavorite={() => toggleFavorite(item)}
      />
    );
  }

  return (
    <ScreenContainer>
      <Text style={[styles.header, { color: colors.text }]}>
        Favorites
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search your favorites"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        style={[
          styles.searchInput,
          {
            borderColor: colors.border,
            backgroundColor: colors.surface,
            color: colors.text,
          },
        ]}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <EmptyState
            title={
              favoritesList.length === 0
                ? "No favorites yet"
                : "No matches"
            }
            subtitle={
              favoritesList.length === 0
                ? "Tap the heart on any image to save it here."
                : "Try a different search term."
            }
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  searchInput: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 15,
  },
  listContent: {
    padding: spacing.xs,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});