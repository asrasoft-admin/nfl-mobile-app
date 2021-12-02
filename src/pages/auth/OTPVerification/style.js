import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {colors} from '../../../assets/colors';
import {fontFamily} from 'assets/fonts';

export default StyleSheet.create({
  root: {
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    marginHorizontal: wp(5),
    height: '100%',
  },
  heading: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    backgroundColor: 'lightgreen',
    marginBottom: hp(3),
    borderRadius: wp(7),
  },
  content: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 20,
  },
  cell: {
    width: wp(12),
    height: wp(12),
    lineHeight: wp(12),
    fontSize: wp(6),
    marginLeft: 1,
    borderWidth: 2,
    borderRadius: wp(2.5),
    borderColor: '#fff',
    backgroundColor: '#fff',
    fontFamily: fontFamily.PoppinsBold,
    textAlign: 'center',
    color: '#000',
  },
  errMsg: {
    color: 'red',
    fontFamily: fontFamily.PoppinsBold,
    fontSize: wp('3.5'),
    textAlign: 'center',
    marginTop: wp(2),
  },

  codeFieldRoot: {marginTop: wp('5')},
});
