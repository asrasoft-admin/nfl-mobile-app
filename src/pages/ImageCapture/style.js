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
    marginVertical: hp(3.5),
  },
  imageHeading: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
  },
  // imageName: {
  //   color: '#000',
  //   fontStyle: 'italic',
  //   maxWidth: '92%',
  // },
  btn: {
    marginBottom: hp(4),
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: wp(15),
    height: hp(10),
    borderRadius: 8,
  },
  imageData: {
    marginHorizontal: wp(4),
    marginVertical: hp(3),
  },
});
