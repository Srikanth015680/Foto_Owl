import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
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
  ProfileFormValues,
} from "../../types";
import { CITIES } from "../../utils/cities";
import {
  hasErrors,
  validateProfileForm,
} from "../../utils/validators";

export default function ProfileScreen() {
  const { colors, mode, toggleMode } = useAppTheme();

  const currentUser = useAuthStore(
    (state) => state.currentUser
  );

  const updateProfile = useAuthStore(
    (state) => state.updateProfile
  );

  const logout = useAuthStore((state) => state.logout);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [values, setValues] = useState<ProfileFormValues>({
    fullName: currentUser?.fullName ?? "",
    mobileNumber: currentUser?.mobileNumber ?? "",
    gender: currentUser?.gender ?? "Other",
    address: currentUser?.address ?? "",
    city: currentUser?.city ?? "",
  });

  if (!currentUser) {
    return null;
  }

  function setField<K extends keyof ProfileFormValues>(
    key: K,
    value: ProfileFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function startEditing() {
    if (!currentUser) {
      return;
    }

    setValues({
      fullName: currentUser.fullName,
      mobileNumber: currentUser.mobileNumber,
      gender: currentUser.gender,
      address: currentUser.address,
      city: currentUser.city,
    });

    setErrors({});
    setIsEditing(true);
  }

  function cancelEditing() {
    setErrors({});
    setIsEditing(false);
  }

  function handleSave() {
    const nextErrors = validateProfileForm(values);

    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    const result = updateProfile(values);

    if (result.success) {
      setIsEditing(false);
      setErrors({});
    } else {
      Alert.alert(
        "Couldn't update profile",
        result.error ?? "Please try again."
      );
    }
  }

  function handleLogout() {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Profile
        </Text>

        <View
          style={[
            styles.themeRow,
            { borderColor: colors.border },
          ]}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 15,
            }}
          >
            Dark Mode
          </Text>

          <Switch
            value={mode === "dark"}
            onValueChange={toggleMode}
          />
        </View>

        {isEditing ? (
          <>
            <AppTextInput
              label="Full Name"
              value={values.fullName}
              onChangeText={(text) =>
                setField("fullName", text)
              }
              error={errors.fullName}
            />

            <AppTextInput
              label="Email Address"
              value={currentUser.email}
              editable={false}
            />

            <RadioGroup<Gender>
              label="Gender"
              options={["Male", "Female", "Other"]}
              value={values.gender}
              onChange={(value) =>
                setField("gender", value)
              }
              error={errors.gender}
            />

            <AppTextInput
              label="Mobile Number"
              value={values.mobileNumber}
              onChangeText={(text) =>
                setField(
                  "mobileNumber",
                  text.replace(/[^0-9]/g, "")
                )
              }
              error={errors.mobileNumber}
              keyboardType="number-pad"
              maxLength={10}
            />

            <AppTextInput
              label="Address"
              value={values.address}
              onChangeText={(text) =>
                setField("address", text)
              }
              error={errors.address}
              multiline
            />

            <Dropdown
              label="City"
              options={CITIES}
              value={values.city}
              onChange={(value) =>
                setField("city", value)
              }
              error={errors.city}
            />

            <View style={styles.editActions}>
              <AppButton
                label="Cancel"
                variant="secondary"
                onPress={cancelEditing}
                style={styles.editButton}
              />

              <AppButton
                label="Save"
                onPress={handleSave}
                style={styles.editButton}
              />
            </View>
          </>
        ) : (
          <>
            <ProfileField
              label="Full Name"
              value={currentUser.fullName}
            />

            <ProfileField
              label="Email Address"
              value={currentUser.email}
            />

            <ProfileField
              label="Mobile Number"
              value={currentUser.mobileNumber}
            />

            <ProfileField
              label="Gender"
              value={currentUser.gender}
            />

            <ProfileField
              label="Address"
              value={currentUser.address}
            />

            <ProfileField
              label="City"
              value={currentUser.city}
            />

            <AppButton
              label="Edit Profile"
              onPress={startEditing}
              style={styles.spaced}
            />

            <AppButton
              label="Log Out"
              variant="danger"
              onPress={handleLogout}
              style={styles.spaced}
            />
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.field}>
      <Text
        style={[
          styles.fieldLabel,
          { color: colors.textMuted },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.fieldValue,
          { color: colors.text },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: spacing.md,
  },

  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    marginBottom: spacing.md,
  },

  field: {
    marginBottom: spacing.md,
  },

  fieldLabel: {
    fontSize: 12,
    marginBottom: 2,
  },

  fieldValue: {
    fontSize: 16,
    fontWeight: "500",
  },

  spaced: {
    marginTop: spacing.sm,
  },

  editActions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },

  editButton: {
    flex: 1,
  },
});