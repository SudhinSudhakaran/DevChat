import React from "react";
import { Text, TextProps, TextStyle, StyleProp } from "react-native";
import { useSelector } from "react-redux";
import styles from "./Label.styles";

interface LabelProps extends TextProps {
  label: string | undefined;
  style?: StyleProp<TextStyle>;
  textAlign?: "left" | "right" | "center" | "justify";
}

const Label: React.FC<LabelProps> = ({ label, style, textAlign, ...props }) => {
  const isRtl = useSelector((state: any) => state?.ui?.isRtl);

  const effectiveTextAlign: TextStyle["textAlign"] =
    textAlign ?? (isRtl ? "right" : "left");

  return (
    <Text
      style={[styles.text, { textAlign: effectiveTextAlign }, style]}
      {...props}
    >
      {label}
    </Text>
  );
};

export default React.memo(Label);
