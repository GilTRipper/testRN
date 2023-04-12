import React from "react";
import { StyleSheet, View } from "react-native";

import { Burger, Row, Text } from "../../components/atoms";

import { Colors } from "../../constants/Colors";

type GameListHeaderProps = {
  onBurgerPress?: () => void;
};

export const GameListHeader = ({ onBurgerPress }: GameListHeaderProps) => {
  return (
    <View style={headerStyles.headerContainer}>
      <Row spaceBetween alignCenter>
        <Text semiBold style={headerStyles.headerTitle}>
          Test app
        </Text>
        <Burger onPress={onBurgerPress} />
      </Row>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
  },
});
