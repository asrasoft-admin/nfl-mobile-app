import React from 'react';
import style from './style';
import {Image} from 'react-native';

export const Texture = () => {
  return (
    <Image
      source={require('assets/images/texture.png')}
      style={style.texture}
      resizeMode="cover"
    />
  );
};
