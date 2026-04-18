import React, { FC } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Colors, Animations } from '../../../constants';
import LottieView from 'lottie-react-native';

interface LogoProps {
  animationStyle?: StyleProp<ViewStyle>;
}

const Logo: FC<LogoProps> = ({ animationStyle }) => {
  return (
    <View style={styles.logoContainer}>
      <LottieView
        source={Animations.LOGO_ANIMATION}
        autoPlay
        loop
        style={[
          {
            width: responsiveScreenWidth(70),
            height: responsiveScreenWidth(70),
          },
          animationStyle,
        ]}
      />

      <Text style={styles.appName}>DevChat</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    color: Colors.WHITE_COLOR,
    fontSize: responsiveScreenWidth(10),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});