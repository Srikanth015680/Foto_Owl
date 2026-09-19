import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import { useAppTheme } from "../hooks/useAppTheme";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import HomeScreen from "../screens/home/HomeScreen";
import ImageDetailsScreen from "../screens/home/ImageDetailsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

import {
  FavoritesStackParamList,
  HomeStackParamList,
  MainTabParamList,
} from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const FavoritesStack =
  createNativeStackNavigator<FavoritesStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Gallery"
        component={HomeScreen}
      />

      <HomeStack.Screen
        name="ImageDetails"
        component={ImageDetailsScreen}
        options={{
          headerShown: true,
          title: "Image",
        }}
      />
    </HomeStack.Navigator>
  );
}

function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <FavoritesStack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
      />

      <FavoritesStack.Screen
        name="ImageDetails"
        component={ImageDetailsScreen}
        options={{
          headerShown: true,
          title: "Image",
        }}
      />
    </FavoritesStack.Navigator>
  );
}

const icons: Record<keyof MainTabParamList, string> = {
  HomeTab: "🖼️",
  FavoritesTab: "♥",
  ProfileTab: "👤",
};

export function MainNavigator() {
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarIcon: () => (
          <Text style={{ fontSize: 18 }}>
            {icons[route.name]}
          </Text>
        ),
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: "Gallery" }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStackNavigator}
        options={{ title: "Favorites" }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}