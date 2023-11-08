/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Header, Button, Texture} from '../../common';
import {style} from './style';
import {widthPercentageToDP as wp} from 'utils/responsive';
import {launchCamera} from 'react-native-image-picker';
import {
  audioRecorderPlayer,
  axiosInstance,
  parseError,
  stopRecording,
} from '../../helpers';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {
  recordSuccess,
  stopAudioRecording,
  uploadSuccess,
} from '../../Redux/Actions/RecordAudio';
import uploadAudioToCloudinary from '../../services/cloudinary/Cloudinary';

export const ImageCapture = ({route, navigation}) => {
  const [shopImage, setShopImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {shopkeeperData} = useSelector(state => state.shopkeeperDetail);
  const {
    isRecording,
    audioPath: audio,
    downloadLink: downloadUrl,
  } = useSelector(state => state.Recorder);

  const dispatch = useDispatch();

  const {handleSubmit, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('Camera cancelled ');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          alert(response.errorMessage);
          return;
        }
        type(response.assets[0]);
      });
    }
  };

  const handleSignOut = async () => {
    if (shopImage.base64 && productImage.base64) {
      setLoading(true);
      let audioPath, downloadLink;
      console.log({downloadUrl});
      setLoading(true);
      if (audio) {
        audioPath = audio;
      } else {
        audioPath = await stopRecording();
        dispatch(stopAudioRecording(audioPath));
        audioRecorderPlayer.removeRecordBackListener(e => {
          // console.log('Recording . . . ', e.currentPosition);
          return;
        });
      }

      if (Boolean(downloadUrl)) {
        downloadLink = downloadUrl;
      } else {
        downloadLink = await uploadAudioToCloudinary(audioPath);
        if (!downloadLink)
          throw new Error('Something went wrong in recording audio');
        dispatch(uploadSuccess(downloadLink));
      }

      await axiosInstance
        .post('/shop-keeper/associate-image-shopKeeper', {
          shop_image: `data:image/png;base64,${shopImage.base64}`,
          product_image: `data:image/png;base64,${productImage.base64}`,
          shopKeeper_id: route.params.id,
        })
        .then(async res => {
          setLoading(false);
          if (res.data.success) {
            console.log({audioPath});
            const {data: resData} = await axiosInstance.post(
              'shop-keeper/details',
              shopkeeperData,
              {audio: downloadLink},
            );
            dispatch(recordSuccess());
            navigation.navigate('SignOut');
          }
        })
        .catch(error => {
          setLoading(false);
          parseError(error);
        });
    }
  };

  console.log({shopkeeperData});
  return (
    <View style={style.root}>
      <Texture />
      <Header navigation={navigation} />

      <View style={style.container}>
        <View>
          <Button
            label="Launch Camera for Shop Image"
            onPress={() => captureImage(setShopImage)}
            containerStyles={style.itemContainer}
          />
          <Button
            label="Launch Camera for Product Image"
            onPress={() => captureImage(setProductImage)}
            containerStyles={style.itemContainer}
          />
          {shopImage && (
            <View style={style.itemContainer}>
              <View style={style.imageContainer}>
                <Image source={{uri: shopImage?.uri}} style={style.image} />
                <View style={style.imageData}>
                  <Text style={style.imageHeading}>Shop Image</Text>
                </View>
              </View>
            </View>
          )}
          {productImage && (
            <View style={style.itemContainer}>
              <View style={style.imageContainer}>
                <Image source={{uri: shopImage?.uri}} style={style.image} />
                <View style={style.imageData}>
                  <Text style={style.imageHeading}>Product Image</Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <Button
          label={!isLoading && 'Next'}
          primary={formState.isValid}
          icon={
            isLoading && (
              <ActivityIndicator
                style={{position: 'absolute', left: wp('36')}}
              />
            )
          }
          // active={formState.isValid && !isLoading}
          onPress={handleSubmit(handleSignOut)}
          containerStyles={style.btn}
          active={shopImage && productImage}
        />
        {/* <Button
          label="Next"
          active={shopImage && productImage}
          onPress={handleSignOut}
        /> */}
      </View>
    </View>
  );
};
