import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {colors} from 'assets/colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: wp(5),
  },
  heading: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    width: '100%',
    // backgroundColor: 'lightgreen',
    textTransform: 'uppercase',
    borderRadius: wp(7),
    marginTop: wp(4),
  },

  allDeals: {
    width: '100%',
  },
  deal: {
    marginTop: 10,
    width: '100%',
  },

  btn: {
    marginVertical: wp(5),
  },

  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray2,
    // maxWidth: "40%",
    borderRadius: wp(2),
    padding: wp(2),
    marginTop: wp(2),
  },

  inputContainer: {
    marginVertical: hp(1),
  },
});
