import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { spacing } from "../theme/colors";

interface Props<T extends string> {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  error?: string;
}

export function RadioGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
}: Props<T>) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {label}
      </Text>

      <View style={styles.row}>
        {options.map((option) => {
          const selected = option === value;

          return (
            <TouchableOpacity
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              style={styles.option}
              onPress={() => onChange(option)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.circle,
                  {
                    borderColor: selected
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              >
                {selected ? (
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                ) : null}
              </View>

              <Text
                style={[
                  styles.optionLabel,
                  { color: colors.text },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? (
        <Text
          style={[
            styles.error,
            { color: colors.danger },
          ]}
        >
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
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionLabel: {
    fontSize: 15,
  },
  error: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
});