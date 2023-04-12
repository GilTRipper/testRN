import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Icons } from "../../constants";

import type {
  ImageResizeMode,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from "react-native";
import type { IconsType } from "../../constants";

type IconProps = {
  onPress?: (() => void) | undefined;
  resizeMode?: ImageResizeMode;
  name: IconsType;
  width?: number | undefined;
  height?: number | undefined;
  style?: StyleProp<ViewStyle>;
  color?: string | undefined;
  hitSlop?: { top: number; left: number; bottom: number; right: number };
};

export const Icon: React.FC<IconProps> = ({
  onPress,
  name,
  width,
  height,
  style,
  hitSlop = { top: 20, left: 20, bottom: 20, right: 20 },
  color,
  resizeMode,
}) => {
  if (!onPress) {
    return (
      <View style={style}>
        <Image
          resizeMode={resizeMode}
          source={Icons[name] as ImageSourcePropType}
          style={[{ width, height }, color ? { tintColor: color } : null]}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.5}
      hitSlop={hitSlop}
      onPress={onPress}>
      <Image
        resizeMode={resizeMode}
        source={Icons[name] as ImageSourcePropType}
        style={[{ width, height }, color ? { tintColor: color } : null]}
      />
    </TouchableOpacity>
  );
};
