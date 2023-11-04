import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from '../../assets/fonts';
import {colors} from '../../assets/colors';

export default StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
  },
  heading: {
    fontSize: wp(7),
    fontWeight: '700',
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    width: '100%',
    borderRadius: wp(7),
    marginBottom: hp(3),
  },
  inputContainer: {
    marginVertical: hp(1),
  },
  btn: {
    marginVertical: hp(2),
  },
  numberInputMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberInputContainer: {
    width: wp(50),
    marginVertical: hp(1),
  },
  inputContainer: {
    marginVertical: hp(1),
  },
  otp: {
    // marginTop: hp(2),
    width: wp(30),
    height: hp(6),
  },
  product: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(3),
  },
});
