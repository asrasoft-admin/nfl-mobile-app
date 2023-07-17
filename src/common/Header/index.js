import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import style from './style';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import LogOutModal from '../Modal/logOut';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/userAction';

export const Header = ({navigation}) => {
  const [timer, setTimer] = useState(0);
  const {isRecording, audio} = useSelector(state => state.Recorder);
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
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);
  const onClose = () => {
    return setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    setLoading(true);
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
        <View>
          <Image
            source={require('assets/images/activeMedia.png')}
            style={style.logo}
            resizeMode="contain"
          />
          {isRecording && (
            <View style={style.recording}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Recording: {timer} s
              </Text>
            </View>
          )}
        </View>
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
