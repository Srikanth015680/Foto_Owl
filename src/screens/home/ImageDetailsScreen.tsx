import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useImageDownload } from "../../hooks/useImageDownload";
import { useGalleryStore } from "../../store/galleryStore";
import { spacing } from "../../theme/colors";
import { HomeStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  HomeStackParamList,
  "ImageDetails"
>;

export default function ImageDetailsScreen({ route }: Props) {
  const { image } = route.params;
  const { colors } = useAppTheme();

  const {
    isDownloading,
    isSharing,
    downloadImage,
    shareImage,
  } = useImageDownload();

  const toggleFavorite = useGalleryStore(
    (state) => state.toggleFavorite
  );

  const isFavorite = useGalleryStore(
    (state) => state.isFavorite(image.id)
  );

  const [statusMessage, setStatusMessage] =
    useState<string | null>(null);

  async function handleDownload() {
    setStatusMessage(null);

    const result = await downloadImage(image);
    setStatusMessage(result.message);

    if (!result.success) {
      Alert.alert("Download failed", result.message);
    }
  }

  async function handleShare() {
    setStatusMessage(null);

    const result = await shareImage(image);

    if (!result.success) {
      Alert.alert("Share failed", result.message);
    }
  }

  return (
    <ScreenContainer edges={["left", "right", "bottom"]}>
      <Image
        source={{ uri: image.download_url }}
        style={styles.fullImage}
        contentFit="contain"
        transition={200}
      />

      <View style={styles.info}>
        <Text style={[styles.author, { color: colors.text }]}>
          {image.author}
        </Text>

        <Text style={[styles.meta, { color: colors.textMuted }]}>
          ID: {image.id} · {image.width}×{image.height}
        </Text>

        {statusMessage ? (
          <Text style={[styles.status, { color: colors.success }]}>
            {statusMessage}
          </Text>
        ) : null}

        <View style={styles.actions}>
          <AppButton
            label={
              isFavorite
                ? "Remove Favorite"
                : "Add to Favorites"
            }
            variant={isFavorite ? "danger" : "secondary"}
            onPress={() => toggleFavorite(image)}
            style={styles.actionButton}
          />

          <AppButton
            label="Download"
            onPress={handleDownload}
            loading={isDownloading}
            style={styles.actionButton}
          />
        </View>

        <AppButton
          label="Share"
          variant="secondary"
          onPress={handleShare}
          loading={isSharing}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  fullImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#00000010",
  },
  info: {
    padding: spacing.lg,
  },
  author: {
    fontSize: 20,
    fontWeight: "700",
  },
  meta: {
    fontSize: 13,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  status: {
    fontSize: 13,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});