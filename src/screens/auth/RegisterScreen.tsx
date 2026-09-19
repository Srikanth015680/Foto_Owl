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
import { Dropdown } from "../../components/Dropdown";
import { RadioGroup } from "../../components/RadioGroup";
import { ScreenContainer } from "../../components/ScreenContainer";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useAuthStore } from "../../store/authStore";
import { spacing } from "../../theme/colors";
import {
  FormErrors,
  Gender,
  RegisterFormValues,
} from "../../types";
import { CITIES } from "../../utils/cities";
import {
  hasErrors,
  validateRegisterForm,
} from "../../utils/validators";
import { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

const INITIAL_VALUES: RegisterFormValues = {
  fullName: "",
  email: "",
  gender: null,
  mobileNumber: "",
  address: "",
  city: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterScreen({ navigation }: Props) {
  const { colors } = useAppTheme();
  const register = useAuthStore((state) => state.register);

  const [values, setValues] =
    useState<RegisterFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] =
    useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField<K extends keyof RegisterFormValues>(
    key: K,
    value: RegisterFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit() {
    const nextErrors = validateRegisterForm(values);

    setErrors(nextErrors);
    setSubmitError(null);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);

    const result = register(values);

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(
        result.error ?? "Something went wrong. Please try again."
      );
      return;
    }

    navigation.navigate("Login");
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
            Create your account
          </Text>

          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Join to browse, search, and save your favorite images.
          </Text>

          <AppTextInput
            label="Full Name"
            value={values.fullName}
            onChangeText={(text) => setField("fullName", text)}
            error={errors.fullName}
            placeholder="Jane Doe"
          />

          <AppTextInput
            label="Email Address"
            value={values.email}
            onChangeText={(text) => setField("email", text)}
            error={errors.email}
            placeholder="jane@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <RadioGroup<Gender>
            label="Gender"
            options={["Male", "Female", "Other"]}
            value={values.gender}
            onChange={(value) => setField("gender", value)}
            error={errors.gender}
          />

          <AppTextInput
            label="Mobile Number"
            value={values.mobileNumber}
            onChangeText={(text) =>
              setField("mobileNumber", text.replace(/[^0-9]/g, ""))
            }
            error={errors.mobileNumber}
            placeholder="10-digit mobile number"
            keyboardType="number-pad"
            maxLength={10}
          />

          <AppTextInput
            label="Address"
            value={values.address}
            onChangeText={(text) => setField("address", text)}
            error={errors.address}
            placeholder="Street, area"
            multiline
          />

          <Dropdown
            label="City"
            options={CITIES}
            value={values.city}
            onChange={(value) => setField("city", value)}
            error={errors.city}
            placeholder="Select your city"
          />

          <AppTextInput
            label="Password"
            value={values.password}
            onChangeText={(text) => setField("password", text)}
            error={errors.password}
            placeholder="At least 6 characters"
            secureTextEntry
          />

          <AppTextInput
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={(text) =>
              setField("confirmPassword", text)
            }
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
            secureTextEntry
          />

          {submitError ? (
            <Text style={[styles.submitError, { color: colors.danger }]}>
              {submitError}
            </Text>
          ) : null}

          <AppButton
            label="Register"
            onPress={handleSubmit}
            loading={isSubmitting}
          />

          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: colors.textMuted }}>
              Already have an account?{" "}
              <Text style={{ color: colors.primary }}>
                Log in
              </Text>
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
    padding: spacing.lg,
    paddingBottom: spacing.xl,
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