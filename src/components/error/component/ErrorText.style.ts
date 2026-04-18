import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  text: {
    fontSize: responsiveScreenFontSize(1.5),
    fontFamily: '',
    color: 'red',
  },
});

export default styles;
