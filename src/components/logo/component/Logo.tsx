import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
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
    <View style={[styles.glowWrapper, containerStyle]}>
      <View style={styles.logoWrapper}>
        <LottieView
          source={Animations.LOGO_ANIMATION}
          autoPlay
          loop
          style={[
            {
              width: responsiveScreenWidth(32),   // ✅ smaller than container (40vw)
              height: responsiveScreenWidth(32),
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
  glowWrapper: {

    justifyContent: 'center',
    alignItems: 'center',

  },
  logoWrapper: {
    justifyContent: 'center',        // ✅ centers animation inside circle
    alignItems: 'center',            // ✅ centers animation inside circle
    overflow: 'hidden',              // ✅ clips anything outside the circle
    borderRadius: responsiveScreenWidth(20), // ✅ half of width/height = perfect circle
    borderWidth: 2,
    borderColor: '#22C55E',

    width: responsiveScreenWidth(40),
    height: responsiveScreenWidth(40),

    // Glow / shadow
    shadowColor: '#22C55E',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
});