import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import style from './style';
import {Image, View, TouchableOpacity} from 'react-native';
import LogOutModal from '../Modal/logOut';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/userAction';

export const Header = ({navigation}) => {
  const {handleSubmit, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const state = useSelector(state => state);
  const user = state.user;

  const dispatch = useDispatch();

  const onShow = () => {
    return setModalVisible(true);
  };

  const onClose = () => {
    return setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    setLoading(true)
    dispatch(logout());
    onClose();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View>
      <View style={style.logoContainer}>
        <Image
          source={require('assets/images/activeMedia.png')}
          style={style.logo}
          resizeMode="contain"
        />

        {user.authenticated ? (
          <TouchableOpacity onPress={onShow}>
            <Image
              source={require('assets/images/national.png')}
              style={style.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('assets/images/national.png')}
            style={style.logo}
            resizeMode="contain"
          />
        )}
      </View>

      <LogOutModal
        onPress={handleSubmit(handleLogout)}
        isLoading={isLoading}
        modalVisible={modalVisible}
        onClose={onClose}
      />
    </View>
  );
};
