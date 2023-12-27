import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import Geolocation from 'react-native-geolocation-service';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import uploadAudioToCloudinary from '../services/cloudinary/Cloudinary';

import config from '../config';
import {syncLoader, updateList} from '../Redux/Actions/allUsers';
import {Audio} from 'react-native-compressor';

import {store} from '../Redux/store';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    return token;
  } catch (error) {
    parseError(error);
  }
};

export const audioRecorderPlayer = new AudioRecorderPlayer();

export const deleteAudioFile = async audioPath => {
  try {
    await RNFS.unlink(audioPath);
    console.log('Audio file deleted successfully');
  } catch (error) {
    console.error('Error deleting audio file:', error);
  }
};

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
  const cachePath = RNFS.CachesDirectoryPath + '/' + 'audio_folder';
  const isCacheFolderExists = await RNFS.exists(cachePath);
  if (!isCacheFolderExists) {
    await RNFS.mkdir(cachePath);
  }
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Convert to ISO string for a standard format
  const audioFilename = formattedDate + '.aac'; // or '.acc' if you prefer

  const audioPath = cachePath + '/' + audioFilename;
  await RNFS.moveFile(result, audioPath);
  audioRecorderPlayer.removeRecordBackListener();
  return audioPath;
};
// export const baseURL = 'https://dds.asrasoft.net';
export const baseURL = config?.baseURL?.BASE_URL;

export const axiosInstance = axios.create({
  baseURL: config?.baseURL?.AXIOS_INSTANCE_URL,
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

export const getAreaFromAPI = async coordinates => {
  try {
    if (coordinates) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.latitude},${coordinates.longitude}&key=AIzaSyD2Dj_yeEdoiT0uACMggKgHncPiAxHYRVk`,
      );

      const firstResult = response.data.results[0];

      const formattedAddress = firstResult.formatted_address;
      const addressComponents = firstResult.address_components;
      const area = addressComponents.find(component =>
        component.types.includes('sublocality_level_1'),
      )?.short_name;

      // const {address, display_name, neighbourhood} = response.data;
      const locationInfo = {
        address: area,
        displayName: formattedAddress,
      };
      return locationInfo;
    }
  } catch (error) {
    console.error(error);
  }
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

export const fetchDeals = async user => {
  return await axiosInstance
    .get('/deal/specific-deals', {
      params: {
        category_id: user.category_id,
        activity_id: user.activity_id,
      },
    })
    .then(res => {
      if (res.data.success) {
        const temp = res.data.data.map(item => ({id: item.id, quantity: 0}));
        return {data: res.data.data, qty: temp};
        // setQuantities(temp);
        // setAllDeals(res.data.data);
      }
    })
    .catch(error => {
      parseError(error);
    });
};

export const handleSync = async data => {
  const syncDataFeatureFlag = config.featureFlags.syncDataFeature;
  let tempData = [...data];
  console.log({data});
  let completedCount = 0;
  let totalCount = tempData.length;

  if (data.length === 0) {
    return Alert.alert(
      'Nothing to Sync',
      'You have to record one or more entries to enable sync data',
      [{text: 'OK'}],
    );
  }

  try {
    let audioFile;
    while (tempData.length > 0) {
      const element = tempData[0];
      try {
        audioFile = element.audioPath;
        // const result1 = await Audio.compress(
        //   audioFile, // recommended wav file but can be use mp3 file
        //   {quality: 'medium'},
        // );

        // const audioCompressed = await Audio.compress(audioFile, {
        //   bitrate: 64000,
        //   samplerate: 44100,
        //   channels: 1,
        // });

        const audio = await uploadAudioToCloudinary(audioFile);
        console.log('ssjklasjdlkajsdlk', {audio});
        const {audioPath, ...finalElement} = element;
        const finalObject = {
          ...finalElement,
          audio,
        };
        const {data: resData} = await axiosInstance.post('/customer/sync', {
          data: [finalObject],
        });
        if (resData) {
          const updatedData = tempData.slice(1);
          console.log({yeyeyeyyey: updatedData});
          store.dispatch(updateList(updatedData));
          tempData = [...updatedData];

          if (updatedData?.length > 0) {
            completedCount++;
            await deleteAudioFile(audioFile);
            const percentage = (completedCount / totalCount) * 100;
            store.dispatch(syncLoader(`${percentage.toFixed(0)}%`));
            console.log(`Upload Progress: ${percentage.toFixed(2)}%`);
          }
        }
        console.log({element});
      } catch (error) {
        store.dispatch(syncLoader(0));
        parseError(error);
        break;
        throw error;
      }
    }

    // const modifiedData = await Promise.all(
    //   data.map(async element => {

    //     return {
    //       ...finalElement,
    //       audio,
    //     };
    //   }),
    // );

    // console.log(
    //   '?????????????????????????????????????????????????????????????????????????>',
    // );
    // const {data: resData} = await axiosInstance.post('/customer/sync', {
    //   data: modifiedData,
    // });
    // console.log({resData});
    // if (resData) {
    //   await deleteAudioFile(audioFile);
    // }
    // console.log(
    //   '=================================================================================>',
    // );
    // // console.log(resData);
    return {success: true};
  } catch (error) {
    store.dispatch(syncLoader(0));
    parseError(error);
    console.log(error);
    throw error; // Re-throw the error to propagate it to the calling function
  }
};
