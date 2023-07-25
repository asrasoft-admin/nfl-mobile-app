import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import style from './style';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import LogOutModal from '../Modal/logOut';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/userAction';
import {audioRecorderPlayer, listener, stopRecording} from '../../helpers';
import {stopAudioRecording} from '../../Redux/Actions/RecordAudio';
import {colors} from '../../assets/colors';

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
  console.log(user.area);
  const onShow = () => {
    return setModalVisible(true);
  };
  useEffect(() => {
    const listener = () => {
      audioRecorderPlayer.addRecordBackListener(e => {
        setTimer((e.currentPosition / 1000).toFixed(0));
      });
    };
    listener();
  }, []);

  const onClose = () => {
    return setModalVisible(!modalVisible);
  };

  const handleLogout = async () => {
    setLoading(true);
    if (isRecording) {
      await stopRecording();
      dispatch(stopAudioRecording(''));
    }
    dispatch(logout());
    onClose();
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View>
      <View style={style.logoContainer}>
        <View style={{}}>
          {/* <Image
            source={require('assets/images/activeMedia.png')}
            style={style.logo}
            resizeMode="contain"
          /> */}
          {user.authenticated && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.purple,
                marginBottom: 5,
              }}>
              {user.name?.toUpperCase()}
            </Text>
          )}
          {user.authenticated && (
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {user.area}
            </Text>
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
      <View>
        {isRecording && (
          <View style={style.recording}>
            <Text
              style={{
                color: 'red',
                fontSize: 18,
                fontWeight: 'bold',
                margin: 'auto',
              }}>
              Recording: {timer} s
            </Text>
          </View>
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
