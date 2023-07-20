import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';
import {widthPercentageToDP as wp} from '../../utils/responsive';
import {fontFamily} from '../../assets/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: wp('12'),
    borderWidth: wp('0.5'),
    borderRadius: wp('6'),
    backgroundColor: colors.purple,
    borderColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: wp('6'),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  label: {
    fontSize: wp('3.5'),
    letterSpacing: 0,
    color: colors.activeColor,
    fontFamily: fontFamily.PoppinsBold,
  },
});
