import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/responsive';

const styles = StyleSheet.create({
  root: {
    height: '100%',
  },
  container: {
    flex: 1,
  },
  texture: {
    height: heightPercentageToDP(4),
    width: widthPercentageToDP(7),
    marginLeft: widthPercentageToDP(2),
  },
});

export default styles;
