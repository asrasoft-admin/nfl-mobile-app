import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from '../../assets/fonts';
import {colors} from 'assets/colors';

export default StyleSheet.create({
  product: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: wp(4),
    color: 'black',
    fontFamily: fontFamily.MontserratBold,
  },
});
