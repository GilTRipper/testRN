import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Category, GameType, SortType, Platform } from "../../lib/api/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export enum RootRoutes {
  HOME = "Home",
  FILTERS = "Filters",
}

export type RootStackParamList = {
  [RootRoutes.HOME]: {
    games?: GameType[];
    activeCategories?: Category[];
    activePlatform?: Platform;
    activeSort?: SortType;
  };
  [RootRoutes.FILTERS]: {
    activeCategories?: Category[];
    activePlatform?: Platform;
    activeSort?: SortType;
  };
};

export type RootStackNavigationProp<
  RouteName extends keyof RootStackParamList = RootRoutes,
> = NavigationProp<RootStackParamList, RouteName>;

export type RootStackScreenProps<
  RouteName extends keyof RootStackParamList = RootRoutes,
> = NativeStackScreenProps<RootStackParamList, RouteName>;

export type RootStackRouteProp<
  RouteName extends keyof RootStackParamList = RootRoutes,
> = RouteProp<RootStackParamList, RouteName>;
