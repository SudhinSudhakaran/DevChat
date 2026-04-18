import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { Colors, Fonts } from '../../../constants';
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  input: {
    flex: 1,
    height: responsiveScreenHeight(6),
    paddingHorizontal: responsiveScreenWidth(4),
    fontFamily: Fonts.INTER_MEDIUM,
    fontSize: responsiveScreenFontSize(2),
    color: Colors.PRIMARY_TEXT_COLOR,
  },
});

export default styles;
