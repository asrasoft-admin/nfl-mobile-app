/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import style from './style';
import {Image, View} from 'react-native';
import {Spinner, Texture} from '../../common';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {allAreaAction} from '../../Redux/Actions/area';

export const Welcome = ({navigation}) => {
  const state = useSelector(states => states);
  const user = state.user;
  const area = state.allArea;
  const dispatch = useDispatch();

  useEffect(async () => {
    if (area.data.length === 0) {
      dispatch(allAreaAction());
    }

    setTimeout(() => {
      if (user.authenticated) {
        if (user.role === 'supervisor') {
          navigation.navigate('SupervisorDetail');
        } else if (user.role === 'consumer') {
          navigation.navigate('RecordAudio');
        } else {
          navigation.navigate('ShopkeerDetail');
        }
      } else if (area.data.length) {
        navigation.navigate('Login');
      }
    }, 500);
  }, [area.data, user.authenticated]);

  return (
    <View style={style.container}>
      <Texture />
      <Image
        source={require('../../assets/images/asra.png')}
        style={style.logo}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/national.png')}
        style={style.logo}
        resizeMode="contain"
      />
      <Spinner />
    </View>
  );
};
