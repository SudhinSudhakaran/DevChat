import React, { ReactNode } from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";
import { useSelector } from "react-redux";
 

interface RtlContainerProps extends ViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const RtlContainer: React.FC<RtlContainerProps> = ({
  children,
  style,
  ...props
}) => {
  const isRtl = useSelector((state: any) => state?.ui?.isRtl);

  const rtlStyle: ViewStyle = {
    flexDirection: isRtl ? "row-reverse" : "row",
    
  };

  return (
    <View {...props} style={[rtlStyle, style]}>
      {children}
    </View>
  );
};

export default React.memo(RtlContainer);
