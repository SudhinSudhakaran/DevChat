import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { Colors, Fonts } from '../../../constants';
 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginTop: responsiveScreenHeight(2),
    height: responsiveScreenHeight(9),
    justifyContent: 'flex-end',
    width: responsiveScreenWidth(88),
    alignSelf: 'center',
  },
  label: {
    fontSize: responsiveScreenFontSize(1.8),
    marginBottom: 3,
    fontFamily: Fonts.INTER_BOLD,
    color: Colors.PRIMARY_COLOR,
  },
  inputContainer: {
    borderWidth: 1,

    borderRadius: 8,
    backgroundColor: Colors.WHITE_COLOR,
    overflow: 'hidden',
  },
});

export default styles;
