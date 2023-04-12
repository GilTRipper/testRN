import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";

import { Screen } from "../../components/atoms";
import { GameItem, GameListHeader } from "../../components/moleculas";

import { useApp } from "../../../lib/hooks";
import { Colors } from "../../constants/Colors";

import type { GameType } from "../../../lib/api/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootRoutes, RootStackScreenProps } from "../../navigation/types";

const LIST_ITEM_HEIGHT = 100;

export const HomeScreen = ({
  navigation,
  route,
}: RootStackScreenProps<RootRoutes.HOME>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [games, setGames] = useState<GameType[]>([]);

  const gamesFromRoute = route.params?.games ?? undefined;

  const app = useApp();
  const insets = useSafeAreaInsets();

  const getAllGames = useCallback(async () => {
    if (gamesFromRoute) {
      setGames(gamesFromRoute);
      return;
    }

    const data = await app.games.getAll();

    setGames(data);
  }, [gamesFromRoute]);

  useEffect(() => {
    getAllGames();
  }, [getAllGames, gamesFromRoute]);

  const openFilters = () => {
    navigation.navigate(RootRoutes.FILTERS, { ...route.params });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAllGames();
    setIsRefreshing(false);
  };

  return (
    <>
      <View style={[styles.plug, { height: insets.top }]} />
      <Screen insetsBottom insetsTop>
        <FlatList
          data={games}
          keyExtractor={item => `game-in-the-list#${item.title}-${item.id}`}
          ListHeaderComponent={() => (
            <GameListHeader onBurgerPress={openFilters} />
          )}
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => <GameItem game={item} />}
          style={styles.listStyle}
          contentContainerStyle={styles.listContentContainerStyle}
          getItemLayout={(_, index) => ({
            length: LIST_ITEM_HEIGHT,
            index,
            offset: LIST_ITEM_HEIGHT * index,
          })}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
  },
  listContentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  plug: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: Colors.dark,
    top: 0,
    width: "100%",
  },
});
