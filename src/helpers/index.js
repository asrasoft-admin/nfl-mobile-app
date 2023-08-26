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
  let time;
  audioRecorderPlayer.addRecordBackListener(e => {
    time = e.currentPosition;
  });
  return time;
};

export const stopRecording = async () => {
  const result = await audioRecorderPlayer?.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  return result;
};
export const baseURL = 'https://nfl-dashboard.vercel.app/';

export const axiosInstance = axios.create({
  // baseURL: 'https://dev-nfl-dds-dashboard.herokuapp.com/api',
  // baseURL: 'https://nfl-dashboard.vercel.app/api',
  baseURL: 'https://dds.asrasoft.net/api',
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
      if (numberLength?.slice(0, 2) === '03') {
        if (numberLength?.length === 11) {
          return {
            valid: true,
            number: numberLength,
          };
        } else {
          throw new Error('Number should be 11 digits long');
        }
      } else {
        throw new Error('First 2 digit should be 03');
      }
    } else {
      return {valid: false};
    }
  } catch (error) {
    parseError(error);
  }
};

export function otpCodeGenerator() {
  var randomNumber = '';
  for (var i = 0; i < 6; i++) {
    var digit = Math.floor(Math.random() * 10);
    randomNumber += digit;
  }
  return randomNumber;
}
export function toTitleCase(str) {
  return str
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, char => char.toUpperCase());
}
