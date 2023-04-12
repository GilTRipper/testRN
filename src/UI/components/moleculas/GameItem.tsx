import React from "react";

import { StyleSheet, View } from "react-native";

import { Row, Text, Image } from "../../components/atoms";

import { Colors } from "../../constants/Colors";

import type { GameType } from "../../../lib/api/types";

type GameItemProps = {
  game: GameType;
};
export const GameItem = ({ game }: GameItemProps) => {
  return (
    <Row alignCenter style={gameItemStyles.gameContainer}>
      <Image
        url={game.thumbnail}
        priority="high"
        style={gameItemStyles.gameImageContainer}
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Text semiBold style={gameItemStyles.gameNameText}>
          {game.title}
        </Text>
        <Row alignCenter spaceBetween style={{ marginTop: "auto" }}>
          <Text>{game.platform}</Text>
          <Text>{game.genre}</Text>
        </Row>
      </View>
    </Row>
  );
};

const gameItemStyles = StyleSheet.create({
  gameContainer: {
    backgroundColor: Colors.black,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    flex: 1,
    marginHorizontal: 20,
  },
  gameImageContainer: {
    height: 80,
    width: 80,
    backgroundColor: Colors.gray,
    borderRadius: 16,
    marginRight: 10,
  },
  gameNameText: {
    fontSize: 16,
  },
});
