import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
