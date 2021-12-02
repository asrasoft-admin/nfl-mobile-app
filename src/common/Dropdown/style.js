import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/responsive';
import {colors} from '../../assets/colors';
import {fontFamily} from '../../assets/fonts';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.gray1,
    padding: wp(1),
    borderRadius: wp(3),
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: wp('11.75'),
  },
  pickerView: {
    minWidth: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: wp('1'),
    height: wp(4),
  },
  filterValue: {
    width: '100%',
    fontSize: wp('1'),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsMedium,
  },
  textError: {
    fontSize: wp('3'),
    color: 'red',
    marginLeft: wp(1),
    fontFamily: fontFamily.MontserratBold,
  },
});
