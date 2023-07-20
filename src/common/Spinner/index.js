import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../assets/colors';

export const CustomSpinner = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color={colors.purple} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
});
