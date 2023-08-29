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
  arrowIconContainer: {},
  disclaimerContainer: {
    flex: 1,
  },
  disclaimerText: {
    fontSize: widthPercentageToDP(4.5),
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    marginTop: heightPercentageToDP(2),
  },
  texture: {
    height: heightPercentageToDP(4),
    width: widthPercentageToDP(7),
    marginLeft: widthPercentageToDP(2),
  },
});

export default styles;
