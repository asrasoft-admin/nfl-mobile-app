import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {colors} from '../../assets/colors';
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
    backgroundColor: colors.green,
    alignItems: 'center',
    paddingVertical: hp(5),
  },
  image: {
    width: hp(20),
    height: wp(20),
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: wp(6),
    color: '#fff',
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
