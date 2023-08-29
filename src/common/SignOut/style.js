import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from '../../assets/fonts';

export default StyleSheet.create({
  root: {
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  image: {
    width: hp(20),
    height: wp(20),
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  footer: {
    width: '100%',
    height: '22%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: wp(6),
    fontFamily: fontFamily.MontserratBold,
  },
  resBtn: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  logout: {
    width: '80%',
    marginVertical: hp(2),
    alignSelf: 'center',
  },
});
