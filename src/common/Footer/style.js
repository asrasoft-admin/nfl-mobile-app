import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from '../../utils/responsive';

export const style = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  footerText: {
    fontSize: wp(3),
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});
