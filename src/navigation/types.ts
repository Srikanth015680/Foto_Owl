import { NavigatorScreenParams } from "@react-navigation/native";

import { PicsumImage } from "../types";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  Gallery: undefined;
  ImageDetails: {
    image: PicsumImage;
  };
};

export type FavoritesStackParamList = {
  FavoritesList: undefined;
  ImageDetails: {
    image: PicsumImage;
  };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  FavoritesTab: NavigatorScreenParams<FavoritesStackParamList>;
  ProfileTab: undefined;
};