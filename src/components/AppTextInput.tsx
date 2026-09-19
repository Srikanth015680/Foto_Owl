import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { radius, spacing } from "../theme/colors";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export function AppTextInput({
  label,
  error,
  style,
  ...inputProps
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {label}
      </Text>

      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          {
            borderColor: error
              ? colors.danger
              : colors.border,
            color: colors.text,
            backgroundColor: colors.surface,
          },
          style,
        ]}
        {...inputProps}
      />

      {error ? (
        <Text style={[styles.error, { color: colors.danger }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: 15,
  },
  error: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
});