import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../utils/responsive';
import {colors} from '../../assets/colors';

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: wp(3),
    marginHorizontal: wp(2),
    marginTop: hp(3),
    elevation: 12,
  },
  todayTextContainer: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: colors.purple,
    textAlign: 'center',
    marginVertical: hp(1),
  },
  flatListContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginVertical: hp(0.5),
  },
  heading: {
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
  title: {
    fontSize: hp(2.5),
  },
});

export default styles;
