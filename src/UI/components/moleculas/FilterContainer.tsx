import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { Text } from "../atoms";
import { Colors } from "../../constants/Colors";

type FilterContainerProps = {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const FilterContainer = ({
  title,
  containerStyle,
  contentContainerStyle,
  children,
}: FilterContainerProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text bold style={styles.title}>
        {title}
      </Text>
      <View style={contentContainerStyle}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.text,
    marginBottom: 12,
  },
});
