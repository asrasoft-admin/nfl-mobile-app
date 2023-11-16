import React from 'react';
import style from './style';
import {Image, ImageBackground, View} from 'react-native';

export const Texture = () => {
  return (
    <Image
      source={require('assets/images/national.png')}
      style={style.texture}
    />
  );
};
