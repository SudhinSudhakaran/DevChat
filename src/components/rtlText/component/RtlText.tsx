import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { useSelector } from "react-redux";

interface RtlTextProps extends TextProps {
  text: string | undefined;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

// Precompile regex once
const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

const RtlText: React.FC<RtlTextProps> = ({
  text = "",
  onPress,
  style,
  ...props
}) => {
  const isRtl = useSelector((state: any) => state?.ui?.isRtl);

  const isTextRtl = text ? rtlChars.test(text) : false;
  const textDirection = isTextRtl || isRtl ? "rtl" : "ltr";

  return (
    <Text
      onPress={onPress}
      {...props}
      style={[
        {
          textAlign: textDirection === "rtl" ? "right" : "left",
          writingDirection: textDirection,
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export default React.memo(RtlText);
