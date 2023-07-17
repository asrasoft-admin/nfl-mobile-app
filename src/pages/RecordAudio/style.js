import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/responsive';
export default StyleSheet.create({
  root: {
    height: '100%',
  },
  container: {
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
});
