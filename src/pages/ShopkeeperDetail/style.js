import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from '../../assets/fonts';

export default StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
  },
  heading: {
    fontSize: wp(8),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'lightgreen',
    borderRadius: wp(7),
    marginBottom: hp(3),
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
