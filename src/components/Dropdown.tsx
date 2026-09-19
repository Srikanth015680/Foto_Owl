import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";
import { radius, spacing } from "../theme/colors";

interface Props {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
}: Props) {
  const { colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);

  function selectOption(option: string) {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {label}
      </Text>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[
          styles.field,
          {
            borderColor: error ? colors.danger : colors.border,
            backgroundColor: colors.surface,
          },
        ]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.7}
      >
        <Text
          style={{
            color: value ? colors.text : colors.textMuted,
            fontSize: 15,
          }}
        >
          {value || placeholder || "Select an option"}
        </Text>
      </TouchableOpacity>

      {error ? (
        <Text style={[styles.error, { color: colors.danger }]}>
          {error}
        </Text>
      ) : null}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={[
            styles.backdrop,
            { backgroundColor: colors.overlay },
          ]}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.sheet,
              { backgroundColor: colors.card },
            ]}
          >
            <Text
              style={[
                styles.sheetTitle,
                { color: colors.text },
              ]}
            >
              {label}
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => selectOption(item)}
                >
                  <Text
                    style={{
                      color:
                        item === value
                          ? colors.primary
                          : colors.text,
                      fontWeight:
                        item === value ? "700" : "400",
                      fontSize: 15,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  field: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  error: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    maxHeight: "60%",
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  optionRow: {
    paddingVertical: spacing.sm + 4,
  },
});