import React from "react";
import { StyleSheet, View, ViewStyle, Platform } from "react-native";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../../constants";
 

interface SafeAreaContainerProps {
  children: React.ReactNode;
  style?: ViewStyle; // Now accepting a single ViewStyle object
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,

    // paddingBottom: insets.bottom,
    backgroundColor: Colors.BACKGROUND_COLOR,
    ...style, // Merging user-provided style

    paddingHorizontal: 8,
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: Colors.BACKGROUND_COLOR }}
    >
    

      <View style={containerStyle}>
       

        {children}
      </View>

      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#000" }} /> */}
    </SafeAreaView>
  );
};

export default SafeAreaContainer;

const styles = StyleSheet.create({});
