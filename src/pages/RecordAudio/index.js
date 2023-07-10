import React, {useEffect, useState} from 'react';
import {View, Button, PermissionsAndroid, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import uploadAudioToCloudinary from './CloudinaryUploader';
import {Header, Texture} from '../../common';
import uploadAudioToCloudinary from '../../services/cloudinary/Cloudinary';

const audioRecorderPlayer = new AudioRecorderPlayer(); // Initialize audioRecorderPlayer
export const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  //   const audioRecorderPlayer = new AudioRecorderPlayer();
  const [audioPath, setAudioPath] = useState('');

  useEffect(() => {
    checkPermissions().then(() => {
      console.log('asd');
    });
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
      if (audioRecorderPlayer !== null) {
        // Check if audioRecorderPlayer is not null

        if (!isRecording) {
          console.log({hhh: new AudioRecorderPlayer()});
          const path = await audioRecorderPlayer.startRecorder();
          console.log({a: path});
          if (path) setIsRecording(true);
          audioRecorderPlayer.addRecordBackListener(e => {
            console.log('Recording . . . ', e.current_position);
            return;
          });
          console.log({path});
          setAudioPath(path);
        } else {
          const result = await audioRecorderPlayer?.stopRecorder();
          audioRecorderPlayer.removeRecordBackListener();
          if (result) setIsRecording(false);
          console.log({result});
          setAudioPath(result);
        }
      } else {
        console.log('audioRecorderPlayer is null');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadAudio = () => {
    if (audioPath) {
      console.log({audioPath});
      uploadAudioToCloudinary(audioPath)
        .then(downloadLink => {
          // Handle the download link
          console.log({downloadLink});
        })
        .catch(error => {
          // Handle error
          console.log(error);
        });
    }
  };

  return (
    <View>
      <Texture />
      <Header />
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={handleRecordAudio}
      />
      {audioPath !== '' && (
        <View>
          <Button title="Upload Audio" onPress={handleUploadAudio} />
        </View>
      )}
    </View>
  );
};
