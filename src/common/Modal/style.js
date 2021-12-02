import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from '../../utils/responsive';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  btn: {
    marginVertical: wp(2),
    width: wp(60),
    marginLeft: wp(9.5),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: wp(3.8),
    backgroundColor: 'white',
    borderRadius: wp(3.9),
    padding: wp(7.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: wp(3),
    fontSize: wp(5.5),
  },
});
