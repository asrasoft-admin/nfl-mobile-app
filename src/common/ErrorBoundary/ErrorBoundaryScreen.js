import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils/responsive';
import {Texture} from '../Texture';
import {Button} from '../Button';

const ErrorBoundaryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Texture />

      <Text style={styles.whoopHead}>Whoops, Somthing went wrong.</Text>
      <Text style={styles.pleaseHead}>
        Please either refresh the app or return home to try again!
      </Text>
      <Text style={styles.ifIssueHead}>
        If the issue continues, Contact - Asra Soft
      </Text>

      <Button
        label="Go to home"
        onPress={() => navigation.navigate('RecordAudio')}
        containerStyles={styles.goToHome}
      />
    </View>
  );
};

export default ErrorBoundaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whoopHead: {
    fontSize: wp(6),
    textAlign: 'center',
    marginVertical: hp(1),
  },
  pleaseHead: {
    fontSize: wp(3),
    textAlign: 'center',
    marginVertical: hp(1),
  },
  ifIssueHead: {
    fontSize: wp(4),
    textAlign: 'center',
    marginVertical: hp(1),
  },
  goToHome: {
    width: wp(90),
    marginTop: hp(1),
  },
});
