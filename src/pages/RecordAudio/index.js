import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid, Platform} from 'react-native';
// import uploadAudioToCloudinary from './CloudinaryUploader';
import {Button, Header, Texture} from '../../common';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {startRecording} from '../../Redux/Actions/RecordAudio';
import {useDispatch, useSelector} from 'react-redux';
import {audioRecorderPlayer, axiosInstance} from '../../helpers';
import {
  getSummaryDataFail,
  getSummaryDataSucess,
} from '../../Redux/Actions/summary';

// const audioRecorderPlayer = new AudioRecorderPlayer();

export const RecordAudio = () => {
  const [audioPath, setAudioPath] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isRecording} = useSelector(state => state.Recorder);
  const user = useSelector(state => state.user);

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

  useEffect(() => {
    const date = new Date().toISOString();
    const dateRes = date.split('T')[0];
    axiosInstance
      .get('/customer/ba-summary', {
        params: {
          ba_id: user?.id,
          date: dateRes,
        },
      })
      .then(({data}) => {
        dispatch(getSummaryDataSucess(data));
        console.log(data, 'res');
      })
      .catch(err => {
        dispatch(getSummaryDataFail(err));
        console.log(err, 'err');
      });
  }, [user, dispatch]);

  return (
    <View style={style.root}>
      <Texture />
      <Header />
      <View style={style.container}>
        <Button label="Start Form" onPress={handleRecordAudio} />
        <Button
          label="View your record"
          onPress={() => navigation.navigate('UserSummary')}
          containerStyles={style.viewSummary}
        />
      </View>
    </View>
  );
};
