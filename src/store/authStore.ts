import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  LoginFormValues,
  ProfileFormValues,
  PublicUser,
  RegisterFormValues,
  User,
} from "../types";
import { STORAGE_KEYS } from "../utils/storageKeys";

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthState {
  users: User[];
  currentUser: PublicUser | null;
  hasHydrated: boolean;
  register: (values: RegisterFormValues) => AuthResult;
  login: (values: LoginFormValues) => AuthResult;
  logout: () => void;
  updateProfile: (values: ProfileFormValues) => AuthResult;
  setHasHydrated: (value: boolean) => void;
}

function toPublicUser(user: User): PublicUser {
  const { password, ...publicUser } = user;
  return publicUser;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      hasHydrated: false,

      register: (values) => {
        const { users } = get();

        const email = values.email.trim().toLowerCase();

        const emailTaken = users.some(
          (user) => user.email.toLowerCase() === email
        );

        if (emailTaken) {
          return {
            success: false,
            error: "An account with this email already exists.",
          };
        }

        const newUser: User = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          fullName: values.fullName.trim(),
          email,
          password: values.password,
          gender: values.gender ?? "Other",
          mobileNumber: values.mobileNumber.trim(),
          address: values.address.trim(),
          city: values.city.trim(),
        };

        set({
          users: [...users, newUser],
        });

        return { success: true };
      },

      login: (values) => {
        const { users } = get();

        const email = values.email.trim().toLowerCase();

        const user = users.find(
          (item) =>
            item.email.toLowerCase() === email &&
            item.password === values.password
        );

        if (!user) {
          return {
            success: false,
            error: "Invalid email or password.",
          };
        }

        set({
          currentUser: toPublicUser(user),
        });

        return { success: true };
      },

      logout: () => {
        set({
          currentUser: null,
        });
      },

      updateProfile: (values) => {
        const { users, currentUser } = get();

        if (!currentUser) {
          return {
            success: false,
            error: "You need to be logged in to update your profile.",
          };
        }

        const updatedUsers = users.map((user) =>
          user.id === currentUser.id
            ? {
                ...user,
                fullName: values.fullName.trim(),
                mobileNumber: values.mobileNumber.trim(),
                gender: values.gender,
                address: values.address.trim(),
                city: values.city.trim(),
              }
            : user
        );

        const updatedUser = updatedUsers.find(
          (user) => user.id === currentUser.id
        );

        if (!updatedUser) {
          return {
            success: false,
            error: "Unable to update profile.",
          };
        }

        set({
          users: updatedUsers,
          currentUser: toPublicUser(updatedUser),
        });

        return { success: true };
      },

      setHasHydrated: (value) => {
        set({
          hasHydrated: value,
        });
      },
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);