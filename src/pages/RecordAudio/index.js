import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid, Platform} from 'react-native';
// import uploadAudioToCloudinary from './CloudinaryUploader';
import {Button, Header, Texture} from '../../common';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {startRecording} from '../../Redux/Actions/RecordAudio';
import {useDispatch, useSelector} from 'react-redux';
import {audioRecorderPlayer} from '../../helpers';

// const audioRecorderPlayer = new AudioRecorderPlayer();

export const RecordAudio = () => {
  const [audioPath, setAudioPath] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isRecording} = useSelector(state => state.Recorder);

  useEffect(() => {
    (async () => {
      await checkPermissions();
    })();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (permission) {
        console.log('Audio recording permission granted.');
      } else {
        await requestPermission();
      }
    }
  };

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecordAudio = async () => {
    try {
      console.log('asdasd');
      if (audioRecorderPlayer !== null) {
        const path = await audioRecorderPlayer.startRecorder();
        if (path) dispatch(startRecording());
        audioRecorderPlayer.addRecordBackListener(e => {
          console.log('Recording . . . ', e.currentPosition);
          return;
        });
        navigation.navigate('CustomerDetail');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={style.root}>
      <Texture />
      <Header />
      <View style={style.container}>
        <Button label="Start Form" onPress={handleRecordAudio} />
      </View>
    </View>
  );
};
