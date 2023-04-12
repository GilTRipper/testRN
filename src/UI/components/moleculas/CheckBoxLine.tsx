import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { CheckBox, Row, Text } from "../atoms";
import { Colors } from "../../constants/Colors";

type RadioButtonLineProps = {
  isActive: boolean;
  onPress?: () => void;
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CheckBoxLine = ({
  text,
  containerStyle,
  ...props
}: RadioButtonLineProps) => {
  return (
    <Pressable style={containerStyle} {...props}>
      <Row alignCenter>
        <CheckBox {...props} style={styles.radioButton} />
        <Text medium color={Colors.text} fontSize={18}>
          {text}
        </Text>
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    marginRight: 10,
  },
});
