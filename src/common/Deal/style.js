import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {colors} from '../../assets/colors';

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray2,
    // maxWidth: "40%",
    borderRadius: wp(2),
    padding: wp(2),
  },
  dealName: {
    fontSize: wp(3),
    color: '#000',
    fontWeight: '700',
  },
  price: {
    fontSize: wp(5),
  },
  btn: {
    height: wp(8),
    borderRadius: wp(2),
    marginTop: wp(2),
  },
  checkBox: {
    marginLeft: wp(80),
  },
  texture: {
    height: hp(4),
    width: wp(7),
  },
});
