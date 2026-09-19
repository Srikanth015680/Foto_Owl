import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
} from "react-native";

import { ImageCard } from "../../components/ImageCard";
import { ScreenContainer } from "../../components/ScreenContainer";
import { SearchAndFilterBar } from "../../components/SearchAndFilterBar";
import {
  EmptyState,
  ErrorView,
  LoadingView,
} from "../../components/StatusViews";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useImageSearch } from "../../hooks/useImageSearch";
import { usePicsumImages } from "../../hooks/usePicsumImages";
import { useGalleryStore } from "../../store/galleryStore";
import { spacing } from "../../theme/colors";
import { PicsumImage } from "../../types";
import { HomeStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<HomeStackParamList, "Gallery">;

const NUM_COLUMNS = 2;

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useAppTheme();

  const {
    images,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    loadMore,
    refresh,
  } = usePicsumImages();

  const {
    query,
    setQuery,
    filter,
    setFilter,
    results,
  } = useImageSearch(images);

  const toggleFavorite = useGalleryStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = useGalleryStore(
    (state) => state.isFavorite
  );

  function renderItem({ item }: { item: PicsumImage }) {
    return (
      <ImageCard
        image={item}
        isFavorite={isFavorite(item.id)}
        onPress={() =>
          navigation.navigate("ImageDetails", { image: item })
        }
        onToggleFavorite={() => toggleFavorite(item)}
      />
    );
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <LoadingView label="Loading images…" />
      </ScreenContainer>
    );
  }

  if (error && images.length === 0) {
    return (
      <ScreenContainer>
        <ErrorView message={error} onRetry={refresh} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <Text style={[styles.header, { color: colors.text }]}>
        Gallery
      </Text>

      <SearchAndFilterBar
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!query.trim() && filter === "all") {
            loadMore();
          }
        }}
        ListFooterComponent={
          isLoadingMore ? (
            <LoadingView label="Loading more…" />
          ) : undefined
        }
        ListEmptyComponent={
          <EmptyState
            title="No images found"
            subtitle="Try a different search term or filter."
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
  listContent: {
    padding: spacing.xs,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});