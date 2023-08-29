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
  disclaimerWarning: {
    backgroundColor: '#e4e4a5',
    paddingVertical: widthPercentageToDP(3),
    marginTop: heightPercentageToDP(1),
    marginHorizontal: widthPercentageToDP(2),
    borderRadius: 12,
  },
  disclaimerText: {
    fontSize: widthPercentageToDP(3),
    fontStyle: 'italic',
    marginHorizontal: widthPercentageToDP(3),
  },
  disclaimerHead: {
    fontStyle: 'normal',
    fontSize: widthPercentageToDP(3),
  },
  texture: {
    height: heightPercentageToDP(4),
    width: widthPercentageToDP(7),
    marginLeft: widthPercentageToDP(2),
  },
});

export default styles;
