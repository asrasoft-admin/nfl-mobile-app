import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from '../../../assets/fonts';
import { colors } from '../../../assets/colors';

export default StyleSheet.create({
  root: {
    height: '100%',
  },
  welcomeHeadingContainer: {
    position: 'relative',
    top: hp(10),
    left: 0,
    bottom: 0,
    right: 0,
    marginHorizontal: wp(5),
  },
  logo: {
    width: wp('100'),
    height: hp(15),
    margin: 0,
    padding: 0,
  },
  welcomeHeadingText: {
    fontSize: wp('6'),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fontFamily.MontserratThin,
  },
  loginHeadingText: {
    fontSize: wp('8'),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: wp('5'),
    color: colors.purple
  },
  container: {
    marginHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  formFields: {
    marginVertical: wp(2),
    justifyContent: 'center',
  },
  errMsg: {
    fontSize: wp('3.6'),
    color: 'red',
    fontFamily: fontFamily.PoppinsBold,
  },
});
