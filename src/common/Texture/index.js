import React from 'react';
import style from './style';
import {Image, ImageBackground, View} from 'react-native';
import config from '../../config';

export const Texture = () => {
  const renderImag = () => {
    if (config.featureFlags.ShowNflLogo) {
      return require('assets/images/national.png');
    } else {
      return require('assets/images/asra.png');
    }
  };

  return <Image source={renderImag()} style={style.texture} />;
};
