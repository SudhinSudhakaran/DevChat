import React, { memo } from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
 
import ButtonLoader from "./ButtonLoader";
import ButtonContainer from "./ButtonContainer";
import ButtonText from "./ButtonText";

interface ButtonProps {
  buttonLabel: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  buttonLabel,
  onPress,
  style,
  titleStyle,
  isLoading = false,
}) => {


  return (
    <ButtonContainer style={style} onPress={onPress}>
{ isLoading ? <ButtonLoader /> : <ButtonText buttonLabel={buttonLabel} style={titleStyle} />}
    </ButtonContainer>
  );
};

export default memo(Button);
