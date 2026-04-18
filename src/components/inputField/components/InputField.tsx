import React, { useState, useCallback } from "react";
import { View, TextInputProps } from "react-native";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
 
import styles from "./InputField.style";
import RtlText from "../../rtlText";
import RtlContainer from "../../rtlContainer";
import Input from "./Input";
 
import ErrorText from "../../error";
import { Colors } from "../../../constants";
import EyeButton from "./EyeButton";
 

interface InputFieldProps extends TextInputProps {
  label: string | undefined;
  isPassword?: boolean;
  placeholder?: string;
  error?: string;
  isMessageBox?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  isPassword = false,
  placeholder = "",
  error = "",
  onChangeText,
  onFocus,
  keyboardType = "default",
  value = "",
  isMessageBox = false,
  autoCapitalize = "none",
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: responsiveScreenHeight(isMessageBox ? 6 : 2),
        },
      ]}
    >
      <RtlText text={label} style={styles.label} />
      <RtlContainer
        style={[
          styles.inputContainer,
          {
            borderColor: isFocused ? Colors.PRIMARY_COLOR : Colors.GRAY_COLOR,
            height: isMessageBox ? responsiveScreenHeight(10) : undefined,
          },
        ]}
      >
        <Input
          placeHolder={label}
          placeholder={placeholder}
          secureTextEntry={isPassword ? secureTextEntry : false}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          keyboardType={keyboardType}
          value={value}
          setIsFocused={setIsFocused}
          autoCapitalize={autoCapitalize}
        />
        {isPassword && (
          <EyeButton
            secureTextEntry={secureTextEntry}
            setSecureTextEntry={setSecureTextEntry}
          />
        )}
      </RtlContainer>
      {error ? <ErrorText text={error} /> : null}
    </View>
  );
};

export default React.memo(InputField);
