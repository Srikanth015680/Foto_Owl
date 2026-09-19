import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { radius, spacing } from "../theme/colors";
import { PicsumImage } from "../types";

interface Props {
  image: PicsumImage;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export function ImageCard({
  image,
  isFavorite,
  onPress,
  onToggleFavorite,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.card },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: image.download_url }}
        style={styles.thumbnail}
        contentFit="cover"
        transition={200}
      />

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        style={[
          styles.favoriteBadge,
          { backgroundColor: colors.overlay },
        ]}
        onPress={onToggleFavorite}
        hitSlop={{
          top: 8,
          bottom: 8,
          left: 8,
          right: 8,
        }}
      >
        <Text style={styles.favoriteIcon}>
          {isFavorite ? "♥" : "♡"}
        </Text>
      </TouchableOpacity>

      <View style={styles.meta}>
        <Text
          style={[
            styles.author,
            { color: colors.text },
          ]}
          numberOfLines={1}
        >
          {image.author}
        </Text>

        <Text
          style={[
            styles.id,
            { color: colors.textMuted },
          ]}
        >
          ID: {image.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.xs,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#00000010",
  },
  favoriteBadge: {
    position: "absolute",
    top: spacing.xs,
    right: spacing.xs,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteIcon: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  meta: {
    padding: spacing.sm,
  },
  author: {
    fontSize: 13,
    fontWeight: "600",
  },
  id: {
    fontSize: 11,
    marginTop: 2,
  },
});