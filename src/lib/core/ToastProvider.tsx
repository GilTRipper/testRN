import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Colors, Layout } from "../../UI/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../../UI/components/atoms";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export enum TOASTER_STATUS {
  ERROR = "error",
  SUCCESS = "success",
}

export type ToastType = {
  status: TOASTER_STATUS;
  message: string;
  duration?: number;
};

type ToasterProviderProps = {
  children: React.ReactNode;
  toastValue: {
    toast: ToastType | undefined;
    setToast: Dispatch<SetStateAction<ToastType | undefined>>;
  };
};

type ToastContext =
  | {
      toast: ToastType | undefined;
      setToast: Dispatch<SetStateAction<ToastType | undefined>>;
    }
  | undefined;

export const ToastContext = React.createContext<ToastContext>(undefined);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const ToastProvider = ({
  children,
  toastValue,
}: ToasterProviderProps) => {
  const animatedToastValue = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const { toast, setToast } = toastValue;

  const handleDiscardToast = () => {
    animatedToastValue.value = withTiming(0, { duration: 300 }, finished => {
      if (finished) {
        runOnJS(setToast)(undefined);
      }
    });
  };

  useEffect(() => {
    if (!toast || !toast.message) {
      animatedToastValue.value = withTiming(0);
      return;
    }

    const duration = toast.duration || 3000;

    animatedToastValue.value = withSpring(1);

    const timeout = setTimeout(() => {
      handleDiscardToast();
      return;
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  const backgroundColor =
    toast?.status === TOASTER_STATUS.ERROR ? Colors.error : Colors.success;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animatedToastValue.value, [0, 1], [-160, 0]) },
    ],
  }));

  return (
    <ToastContext.Provider value={toastValue}>
      <AnimatedPressable
        onPress={handleDiscardToast}
        style={[
          styles.toasterContainer,
          { top: Math.max(insets.top, 20), backgroundColor },
          animatedStyle,
        ]}>
        <Text medium style={styles.toasterText}>
          {toast?.message}
        </Text>
      </AnimatedPressable>

      {children}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toasterContainer: {
    position: "absolute",
    minHeight: 60,
    width: Layout.width - 32,
    alignSelf: "center",
    top: 0,
    zIndex: 9999,
    opacity: 0.9,
    borderRadius: 15,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  toasterText: {
    color: Colors.text,
    fontSize: 17,
    lineHeight: 19,
  },
});
