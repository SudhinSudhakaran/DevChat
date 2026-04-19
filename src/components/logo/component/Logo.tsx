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
  containerStyle?: StyleProp<ViewStyle>;
}

const Logo: FC<LogoProps> = ({ containerStyle, animationStyle }) => {
  return (
    <View style={styles.glowWrapper}>
      <View style={styles.logoWrapper}>
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
      </View>
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
  logoWrapper: {
    padding: 4,
    borderRadius: 100,

    shadowColor: "#22C55E",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 2,
    width: responsiveScreenWidth(40),
    height: responsiveScreenWidth(40),
    borderWidth: 2,
    borderColor: "#22C55E",
  },
});