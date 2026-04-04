import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Colors, Fonts } from '../../../constants';
 

const styles = StyleSheet.create({
  text: {
    color: Colors.WHITE_COLOR,
    fontFamily: Fonts.INTER_SEMIBOLD,
    fontSize: responsiveScreenFontSize(1.8),
  },
});

export default styles;
