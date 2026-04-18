import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenHeight(10),
  },
});

export default styles;
