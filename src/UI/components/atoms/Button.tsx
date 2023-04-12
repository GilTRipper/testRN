import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import { Text } from "./Text";
import { Colors } from "../../constants/Colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  onPress?: (() => void) | undefined;
  onPressIn?: (() => void) | undefined;
  onPressOut?: (() => void) | undefined;
};

export const Button = ({
  children,
  style,
  textStyle,
  isLoading,
  onPress,
  onPressIn,
  onPressOut,
}: ButtonProps) => {
  const buttonValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(buttonValue.value, [0, 1], [1, 0.95]),
      },
    ],
  }));

  const handlePressIn = () => {
    buttonValue.value = withTiming(1, { duration: 250 });

    onPressIn?.();
  };
  const handlePressOut = () => {
    buttonValue.value = withTiming(0, { duration: 250 });

    onPressOut?.();
  };

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.text} />
      ) : (
        <Text medium style={[styles.text, textStyle]}>
          {children}
        </Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
  },
});
