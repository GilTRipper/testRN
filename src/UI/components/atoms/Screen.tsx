import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";

type ScreenProps = {
  children?: React.ReactNode;
  paddingHorizontal?: boolean;
  insetsTop?: boolean;
  insetsBottom?: boolean;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export const Screen: React.FC<ScreenProps> = ({
  paddingHorizontal,
  insetsTop,
  insetsBottom,
  style,
  children,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        paddingHorizontal && { paddingHorizontal: 20 },
        insetsTop && { paddingTop: insets.top },
        insetsBottom && { paddingBottom: Math.max(insets.bottom, 20) },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};
