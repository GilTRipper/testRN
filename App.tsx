import React from "react";
import { StatusBar } from "react-native";

import { AppProvider, createApp } from "./src/lib/core";
import { RootNavigator } from "./src/UI/navigation/RootNavigator";

const data = {
  "archery-mission-lvl": {
    fails: 9,
    gameId: "archery-world-tour",
    playTime: 5291.706,
    wins: 8,
  },
  "archery-world-mission-1": {
    fails: 9,
    gameId: "archery-world-tour",
    playTime: 981,
    wins: 6,
  },
  "bubble-woods-mission-1": {
    fails: 19,
    gameId: "bubble-woods",
    playTime: 1206,
    wins: 9,
  },
  "bubble-woods-mission-lvl": {
    fails: 1,
    gameId: "bubble-woods",
    playTime: 100,
    wins: 2,
  },
  "candy-bubble-mission-lvl": {
    fails: 6,
    gameId: "candy-bubble",
    playTime: 1558,
    wins: 6,
  },
};

type Result = {
  fails: number;
  gameId: string;
  playTime: number;
  wins: number;
};

const getGrouped = () => {
  return Object.entries(data).reduce<Result[]>((acc, cur) => {
    const [, value] = cur;
    if (acc.some(i => i.gameId === value.gameId)) {
      const a = acc.find(i => i.gameId === value.gameId);
      a!.fails += value.fails;
      a!.playTime += value.playTime;
      a!.wins += value.wins;
    } else {
      acc.push(value);
    }
    return acc;
  }, []);
};

const App = () => {
  const app = createApp();

  /**
   * completed test snippet from developers test
   */
  console.log(getGrouped());

  return (
    <AppProvider app={app}>
      <StatusBar barStyle="light-content" />
      <RootNavigator />
    </AppProvider>
  );
};

export default App;
