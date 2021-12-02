import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/responsive';
import {colors} from '../../assets/colors';
import {fontFamily} from '../../assets/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.gray1,
    padding: wp(0.4),
    borderRadius: wp(1.6),
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    marginVertical: wp('2'),
    marginTop: 7,
  },
  item: {
    borderColor: '#bbb',
    minWidth: '100%',
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: wp('2'),
    marginVertical: wp('0.1'),
    height: wp(10),
    backgroundColor: colors.gray1,
  },
  textInput: {
    padding: 5,
    width: '100%',
    fontSize: wp('4.5'),
    color: colors.gray4,
    fontFamily: fontFamily.PoppinsMedium,
    // placeholderTextColor: 'gray',
  },
});
