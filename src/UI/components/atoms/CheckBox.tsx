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
import { Icon } from "./Icon";

type RadioButtonProps = {
  isActive: boolean;
  onPress?: (() => void) | undefined;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox = ({ isActive, onPress, style }: RadioButtonProps) => {
  const radioButtonValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          radioButtonValue.value,
          [0, 0.2, 0.4, 0.6, 0.8, 1],
          [0, 0.8, 1.1, 1.3, 1.1, 1],
        ),
      },
    ],
  }));

  useEffect(() => {
    if (!isActive) {
      radioButtonValue.value = withTiming(0, { duration: 400 });
      return;
    }
    radioButtonValue.value = withTiming(1, { duration: 400 });
  }, [isActive]);

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Animated.View style={[styles.checkbox, animatedStyle]}>
        <Icon name="check" height={20} width={20} color={Colors.text} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 22,
    width: 22,
    borderRadius: 5,
    backgroundColor: Colors.text,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    backgroundColor: Colors.primary,
    height: 22,
    width: 22,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
