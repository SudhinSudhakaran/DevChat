import React, { ReactNode, memo } from "react";
import { ViewStyle, StyleProp, TouchableOpacity } from "react-native";
import styles from "./ButtonContainer.styles";

interface ButtonContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

export default memo(ButtonContainer);
