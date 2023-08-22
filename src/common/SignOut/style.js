import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
import {colors} from '../../assets/colors';
import {fontFamily} from '../../assets/fonts';

export default StyleSheet.create({
  root: {
    height: '100%',
  },
  overlay: {
    flex: 1,
    // justifyContent: 'center',
  },
  header: {
    // backgroundColor: colors.purple,
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  image: {
    width: hp(20),
    height: wp(20),
  },
  content: {
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    width: '100%',
  },
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
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: wp(6),
    // color: '#fff',
    fontFamily: fontFamily.MontserratBold,
  },
  resBtn: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  logout: {
    width: '80%',
    marginVertical: hp(2),
    alignSelf: 'center',
  },
});
