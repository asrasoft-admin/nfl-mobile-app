import React from 'react';
import {View, Text} from 'react-native';
import {style} from './style';

const Footer = () => {
  return (
    <View style={style.container}>
      <Text style={style.footerText}>
        Powered by Asra Soft in collaboration with Bronaj
      </Text>
    </View>
  );
};

export default Footer;
