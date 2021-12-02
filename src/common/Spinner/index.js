import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const CustomSpinner = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
});
