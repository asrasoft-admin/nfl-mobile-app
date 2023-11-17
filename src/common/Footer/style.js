import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from '../../utils/responsive';
import {colors} from '../../assets/colors';

export const style = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  footerText: {
    fontSize: wp(3),
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
});
