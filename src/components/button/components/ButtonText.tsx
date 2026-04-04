import React, { memo } from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import styles from "./ButtonText.styles";

interface ButtonTextProps extends TextProps {
  buttonLabel: string;
  style?: StyleProp<TextStyle>;
}

const ButtonText: React.FC<ButtonTextProps> = ({
  buttonLabel,
  style,
  ...rest
}) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {buttonLabel}
    </Text>
  );
};

export default memo(ButtonText);
