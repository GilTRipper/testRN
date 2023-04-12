import React from "react";

import FastImage, {
  Priority,
  Source,
  FastImageProps,
} from "react-native-fast-image";

type ImageProps = {
  url: string;
  priority: Priority | undefined;
};

export const Image = ({
  url,
  priority,
  ...props
}: ImageProps & FastImageProps) => {
  return (
    <FastImage
      source={
        {
          uri: url,
          priority,
        } as Source
      }
      {...props}
    />
  );
};
