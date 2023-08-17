import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';

export default StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    alignItems: 'center',
  },
  recording: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
    width: '100%',
  },
  logo: {
    // width: wp('40'),
    justifyContent: 'center',
    height: hp(15),
    margin: 0,
    padding: 0,
  },
});
