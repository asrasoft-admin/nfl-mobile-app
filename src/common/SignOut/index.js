import React from 'react';
import style from './style';
import {Image, View, Text} from 'react-native';
import {Button} from '..';
import {Texture, Header} from '..';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/userAction';

export const SignOut = ({navigation}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleAnotherRes = () => {
    if (user.role === 'supervisor') {
      navigation.reset({
        index: 0,
        routes: [{name: 'SupervisorDetail'}],
      });
    } else if (user.role === 'consumer') {
      navigation.reset({
        index: 0,
        routes: [{name: 'CustomerDetail'}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'ShopkeerDetail'}],
      });
    }
  };

  return (
    <View style={style.root}>
      <Texture />
      <Header navigation={navigation} />
      <View style={style.overlay}>
        <View style={style.header}>
          <Image
            source={require('../../assets/images/smile.png')}
            style={style.image}
            resizeMode="contain"
          />
        </View>
        <View style={style.content}>
          <Text style={style.text}>
            Your data has been successfully submitted
          </Text>
          <Button
            label="Submit another response "
            containerStyles={style.resBtn}
            onPress={handleAnotherRes}
          />
          <Button
            label="Logout"
            containerStyles={style.logout}
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};
