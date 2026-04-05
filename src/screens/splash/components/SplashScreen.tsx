import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Animations, Colors } from '../../../constants';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Components } from '../../../components';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { navigate } from '../../../utils/NavigationUtils';

// 👉 Define RootState type (adjust based on your store)
interface RootState {
  user: {
    isUserLoggedIn: boolean;
  };
}

const SplashScreen: React.FC = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isUserLoggedIn
  );
const userDetails = useSelector((state: RootState) => state.user?.userDetails);
  console.log("isUserLoggedIn in SplashScreen:", isUserLoggedIn);
  console.log("userDetails in SplashScreen:", userDetails);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (isUserLoggedIn) {
        navigate('HomeStack');
      } else {
        navigate('AuthStack');
      }
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isUserLoggedIn]);

  return (
    <View style={styles.container}>
      <Components.Background>
        <Components.SizedBox verticalSpace={30} />

        <Components.Logo />

      </Components.Background>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },

});