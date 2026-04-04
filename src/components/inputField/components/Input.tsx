import React, { memo } from "react";
import { TextInput, TextInputProps, StyleProp, TextStyle } from "react-native";
import { useSelector } from "react-redux";
import styles from "./Input.style";

interface InputProps extends TextInputProps {
  placeHolder?: string;
  onChangeText?: (value: string) => void;
  onFocus?: () => void;
  style?: StyleProp<TextStyle>;
  setIsFocused?: (value: boolean) => void;
  autoCapitalize?: string;
}

const Input: React.FC<InputProps> = ({
  placeHolder,
  onChangeText,
  onFocus,
  secureTextEntry,
  value,
  style,
  setIsFocused,
  autoCapitalize = "none",
  ...props
}) => {
  const { isRtl } = useSelector((state: any) => state?.ui);

  const textAlignStyle = {
    textAlign: isRtl ? "right" : "left",
    direction: isRtl ? "rtl" : "ltr",
  };

  return (
    <TextInput
      placeholder={placeHolder}
      secureTextEntry={secureTextEntry}
      value={value}
      autoComplete="off"
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      onChangeText={onChangeText}
      style={[styles.input, textAlignStyle, style]}
      onFocus={() => {
        onFocus?.();
        setIsFocused(true);
      }}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default memo(Input);
