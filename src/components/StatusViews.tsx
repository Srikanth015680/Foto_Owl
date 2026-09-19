import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { spacing } from "../theme/colors";

import { AppButton } from "./AppButton";

export function LoadingView({
  label = "Loading…",
}: {
  label?: string;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.center}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />

      <Text
        style={[
          styles.text,
          { color: colors.textMuted },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export function ErrorView({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.center}>
      <Text style={styles.icon}>⚠️</Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontWeight: "600",
          },
        ]}
      >
        {message}
      </Text>

      {onRetry ? (
        <AppButton
          label="Try again"
          onPress={onRetry}
          style={styles.retryButton}
        />
      ) : null}
    </View>
  );
}

export function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.center}>
      <Text style={styles.icon}>🗂️</Text>

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontWeight: "600",
          },
        ]}
      >
        {title}
      </Text>

      {subtitle ? (
        <Text
          style={[
            styles.text,
            {
              color: colors.textMuted,
              fontSize: 13,
            },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  text: {
    fontSize: 15,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  icon: {
    fontSize: 32,
  },
  retryButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});