import {StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../../constants';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenHeight(10),
  },


formContainer:{
  backgroundColor: '#ffffffa3',
  width: responsiveWidth(100),
 height: responsiveHeight(50),

  borderRadius:30,
},
  signUpContainer: {
    alignSelf: 'center',
  },
  signUpText: {
    color: 'blue',
    textDecorationColor: 'blue',
    textDecorationLine: 'underline',
    fontSize: responsiveScreenFontSize(2.1),
  },
  label: {
    textAlign: 'center',
    fontFamily: Fonts.INTER_REGULAR,
    paddingBottom: 8,
    color: Colors.PRIMARY_COLOR,
    fontSize: 16,
    marginTop: 8,
  },

});

export default styles;
