import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

interface SizeBoxProps {
  horizontalSpace?: number; // percent of screen width
  verticalSpace?: number; // percent of screen height
  style?: StyleProp<ViewStyle>;
}

const SizedBox: React.FC<SizeBoxProps> = ({
  horizontalSpace = 2,
  verticalSpace = 2,
  style,
}) => {
  const boxStyle = useMemo(
    () => ({
      height: responsiveScreenHeight(verticalSpace),
      width: responsiveScreenWidth(horizontalSpace),
    }),
    [verticalSpace, horizontalSpace]
  );

  return <View style={[boxStyle, style]} />;
};

export default React.memo(SizedBox);
