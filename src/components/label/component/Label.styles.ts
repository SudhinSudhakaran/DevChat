import {StyleSheet} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Colors, Fonts } from '../../../constants';
 

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.INTER_SEMIBOLD,
    color: Colors.PRIMARY_COLOR,
    fontSize: responsiveScreenFontSize(2),
  },
});

export default styles;
