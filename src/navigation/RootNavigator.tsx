import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { View } from "react-native";

import { LoadingView } from "../components/StatusViews";
import { useAppTheme } from "../hooks/useAppTheme";
import { useAuthStore } from "../store/authStore";

import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";

export function RootNavigator() {
  const { colors, mode } = useAppTheme();

  const currentUser = useAuthStore((state) => state.currentUser);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const navigationTheme = mode === "dark" ? DarkTheme : DefaultTheme;

  if (!hasHydrated) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <LoadingView label="Getting things ready…" />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        ...navigationTheme,
        colors: {
          ...navigationTheme.colors,
          background: colors.background,
          card: colors.surface,
        },
      }}
    >
      {currentUser ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}