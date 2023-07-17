import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import uploadAudioToCloudinary from '../services/cloudinary/Cloudinary';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    return token;
  } catch (error) {
    parseError(error);
  }
};

export const baseURL = 'https://nfl-dashboard.vercel.app/';

export const audioRecorderPlayer = new AudioRecorderPlayer();

export const handleUploadAudio = async audioPath => {
  if (audioPath) {
    console.log({audioPath});
    uploadAudioToCloudinary(audioPath)
      .then(downloadLink => {
        // Handle the download link
        return downloadLink;
      })
      .catch(error => {
        // Handle error
        throw new Error(error.message);
      });
  }
};

export const listener = () => {
  return audioRecorderPlayer.addRecordBackListener(e => {
    return e.currentPosition;
  });
};

export const stopRecording = async () => {
  const result = await audioRecorderPlayer?.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  return result;
};

export const axiosInstance = axios.create({
  // baseURL: 'https://dev-nfl-dds-dashboard.herokuapp.com/api',
  baseURL: 'https://df51-202-47-55-165.ngrok-free.app/api',
});

export const getLocation = setLocation => {
  Geolocation.requestAuthorization();
  Geolocation.getCurrentPosition(
    pos => {
      if (pos && pos.coords && setLocation) setLocation(pos.coords);
    },
    error => {
      parseError(error);
    },
    {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 10000,
      showLocationDialog: true,
      forceRequestLocation: true,
    },
  );
};

export const parseError = error => {
  const errorMessage = error?.response?.data?.error?.message
    ? error?.response?.data?.error?.message
    : error?.message;
  Alert.alert('Error occured', `Failed to submit data ${errorMessage}`, [
    {text: 'OK'},
  ]);
};

export const numberValidation = data => {
  const numberLength = data?.number;
  try {
    if (numberLength) {
      if (numberLength?.slice(0, 2) === '92') {
        if (numberLength?.length === 12) {
          return {
            valid: true,
            number: numberLength,
          };
        } else {
          throw new Error('Number should be 12 digits long');
        }
      } else {
        throw new Error('First 2 digit should be 92');
      }
    } else {
      return {valid: false};
    }
  } catch (error) {
    parseError(error);
  }
};

export const otpCodeGenerator = () => Math.random().toString(36).slice(2, 6);
