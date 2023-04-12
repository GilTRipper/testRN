import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";

type RowProps = {
  children?: React.ReactNode;
  alignCenter?: boolean;
  alignStart?: boolean;
  style?: StyleProp<ViewStyle>;
  wrap?: boolean;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
  spaceBetween?: boolean;
  marginHorizontal?: boolean;
  center?: boolean;
};

export const Row: React.FC<RowProps> = ({
  children,
  alignCenter,
  alignStart,
  style,
  wrap,
  marginHorizontal,
  pointerEvents,
  spaceBetween,
  center,
}) => (
  <View
    pointerEvents={pointerEvents}
    style={[
      { flexDirection: "row" },
      alignCenter && { alignItems: "center" },
      alignStart && { alignItems: "flex-start" },
      wrap && { flexWrap: "wrap" },
      spaceBetween && { justifyContent: "space-between" },
      marginHorizontal && { marginHorizontal: 20 },
      center && { justifyContent: "center" },
      style,
    ]}>
    {children}
  </View>
);
