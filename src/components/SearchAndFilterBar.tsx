import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import { radius, spacing } from "../theme/colors";
import { FilterOption } from "../types";

const FILTERS: { label: string; value: FilterOption }[] = [
  { label: "All Images", value: "all" },
  { label: "Author A-M", value: "a-m" },
  { label: "Author N-Z", value: "n-z" },
];

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  filter: FilterOption;
  onFilterChange: (value: FilterOption) => void;
  placeholder?: string;
}

export function SearchAndFilterBar({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  placeholder = "Search by author name",
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={query}
        onChangeText={onQueryChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.searchInput,
          {
            borderColor: colors.border,
            backgroundColor: colors.surface,
            color: colors.text,
          },
        ]}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {FILTERS.map((item) => {
          const selected = item.value === filter;

          return (
            <TouchableOpacity
              key={item.value}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onFilterChange(item.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected
                    ? colors.primary
                    : colors.surface,
                  borderColor: selected
                    ? colors.primary
                    : colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: selected
                    ? colors.primaryText
                    : colors.text,
                  fontSize: 13,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  searchInput: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  chipRow: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
});