import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from '../../../assets/fonts';

export default StyleSheet.create({
  root: {
    height: '100%',
  },
  welcomeHeadingContainer: {
    position: 'relative',
    top: hp(13),
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    marginHorizontal: wp(5),
  },
  welcomeHeadingText: {
    fontSize: wp('10'),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginHeadingText: {
    fontSize: wp('10'),
    fontWeight: 'bold',
    textAlign: 'center'
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
