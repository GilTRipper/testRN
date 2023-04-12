import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

type BurgerProps = {
  onPress?: (() => void) | undefined;
};

export const Burger = ({ onPress }: BurgerProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.5 : 1}
      onPress={onPress}
      style={styles.burgerContainer}>
      <View style={styles.burgerItemContainer} />
      <View style={styles.burgerItemContainer} />
      <View style={styles.burgerItemContainer} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  burgerContainer: {
    height: 14,
    width: 20,
    justifyContent: "space-between",
  },

  burgerItemContainer: {
    height: 2,
    backgroundColor: Colors.text,
  },
});
