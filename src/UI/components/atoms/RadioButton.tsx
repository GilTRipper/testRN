import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/Colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type RadioButtonProps = {
  isActive: boolean;
  onPress?: (() => void) | undefined;
  style?: StyleProp<ViewStyle>;
};

export const RadioButton = ({ isActive, onPress, style }: RadioButtonProps) => {
  const radioButtonValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(radioButtonValue.value, [0, 1], [1, 7]),
  }));

  useEffect(() => {
    if (!isActive) {
      radioButtonValue.value = withTiming(0, { duration: 200 });
      return;
    }
    radioButtonValue.value = withTiming(1, { duration: 200 });
  }, [isActive]);

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.container, style, animatedStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: Colors.text,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
