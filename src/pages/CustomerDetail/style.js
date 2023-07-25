import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';

export default StyleSheet.create({
  root: {
    // height: '100%',
    flex: 1
  },
  radio: {
    color: 'black',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  radioContainer: {
    marginVertical: hp(3),
  },
  heading: {
    fontSize: wp(7),
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    width: '100%',
    // backgroundColor: '#4D11A4',
    borderRadius: wp(7),
    marginBottom: hp(3),
  },
  otp: {
    marginTop: hp(2),
  },

  inputContainer: {
    marginVertical: hp(1),
  },
  btn: {
    marginVertical: hp(2),
  },
  product: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(3),
  },
});
