import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { AppButton } from "../../components/AppButton";
import { AppTextInput } from "../../components/AppTextInput";
import { ScreenContainer } from "../../components/ScreenContainer";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthStore } from "../../store/authStore";
import { spacing } from "../../theme/colors";
import { FormErrors, LoginFormValues } from "../../types";
import { hasErrors, validateLoginForm } from "../../utils/validators";
import { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const login = useAuthStore((state) => state.login);

  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField<K extends keyof LoginFormValues>(
    key: K,
    value: LoginFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit() {
    const nextErrors = validateLoginForm(values);

    setErrors(nextErrors);
    setSubmitError(null);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);

    const result = login(values);

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome back
          </Text>

          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Log in to continue browsing the gallery.
          </Text>

          <AppTextInput
            label="Email Address"
            value={values.email}
            onChangeText={(text) => setField("email", text)}
            error={errors.email}
            placeholder="jane@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <AppTextInput
            label="Password"
            value={values.password}
            onChangeText={(text) => setField("password", text)}
            error={errors.password}
            placeholder="Your password"
            secureTextEntry
          />

          {submitError ? (
            <Text style={[styles.submitError, { color: colors.danger }]}>
              {submitError}
            </Text>
          ) : null}

          <AppButton
            label="Log In"
            onPress={handleSubmit}
            loading={isSubmitting}
          />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: colors.textMuted }}>
              Don't have an account?{" "}
              <Text style={{ color: colors.primary }}>Register</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: spacing.lg,
  },
  submitError: {
    fontSize: 13,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  linkRow: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
});