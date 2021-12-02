import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';

export const style = StyleSheet.create({
  root: {
    height: '100%',
  },
  container: {
    justifyContent: 'space-between',
    height: '80%',
    paddingHorizontal: wp(5),
  },
  itemContainer: {
    marginVertical: hp(3),
  },
  imageHeading: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  imageName: {
    color: '#fff',
    fontStyle: 'italic',
  },
});
