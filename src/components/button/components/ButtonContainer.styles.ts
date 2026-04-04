import {StyleSheet} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { Colors } from '../../../constants';
 

const styles = StyleSheet.create({
  container: {
    width: responsiveScreenWidth(88),
    height: responsiveScreenHeight(5),
    backgroundColor: Colors.PRIMARY_COLOR,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
