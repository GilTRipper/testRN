import React from "react";
import type {
  StyleProp,
  TextStyle,
  TextProps as BaseTextProps,
} from "react-native";
import { StyleSheet, Text as BaseText } from "react-native";
import { Colors } from "../../constants/Colors";

export type TextProps = {
  children?: React.ReactNode | string;
  bold?: boolean | undefined;
  medium?: boolean | undefined;
  semiBold?: boolean | undefined;
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontWeight: "400",
  },
  medium: {
    fontWeight: "500",
  },
  bold: {
    fontWeight: "700",
  },
  semiBold: {
    fontWeight: "600",
  },
});

export const Text: React.FC<TextProps & BaseTextProps> = ({
  bold,
  semiBold,
  medium,
  style,
  lineHeight,
  fontSize,
  color,
  children,
  ...props
}) => (
  <BaseText
    allowFontScaling={false}
    style={[
      styles.text,
      medium && styles.medium,
      semiBold && styles.semiBold,
      bold && styles.bold,
      style,
      lineHeight ? { lineHeight } : null,
      fontSize ? { fontSize } : null,
      color ? { color } : null,
    ]}
    {...props}>
    {children}
  </BaseText>
);
