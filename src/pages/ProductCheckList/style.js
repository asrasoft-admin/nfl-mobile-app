import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {fontFamily} from 'assets/fonts';
import {colors} from 'assets/colors';

export default StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    // height: '100%',
  },
  heading: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    width: '100%',
    textTransform: 'uppercase',
  },
  subHeading: {
    color: '#000',
    fontSize: wp(5),
    marginVertical: wp(3),
    marginHorizontal: wp(2.5),
  },
  product: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: wp(4),
    marginLeft: wp(4),
    color: '#000',
  },
  checkBox: {
    marginLeft: wp(1),
  },
  content: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: wp(1),
  },
  button: {
    marginVertical: wp(5),
  },
});
