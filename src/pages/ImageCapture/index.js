/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  Text,
  View,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {Header, Button, Texture} from '../../common';
import {style} from './style';
import {widthPercentageToDP as wp} from 'utils/responsive';
import {launchCamera} from 'react-native-image-picker';
import {axiosInstance, parseError} from '../../helpers';
import {useForm} from 'react-hook-form';

export const ImageCapture = ({route, navigation}) => {
  const [shopImage, setShopImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
      await axiosInstance
        .post('/shop-keeper/associate-image-shopKeeper', {
          shop_image: `data:image/png;base64,${shopImage.base64}`,
          product_image: `data:image/png;base64,${productImage.base64}`,
          shopKeeper_id: route.params.id,
        })
        .then(res => {
          setLoading(false);
          if (res.data.success) {
            navigation.navigate('SignOut');
          }
        })
        .catch(error => {
          setLoading(false);
          parseError(error);
        });
    }
  };

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
              <Text style={style.imageHeading}>Shop Image</Text>
              <Text style={style.imageName}>{shopImage.fileName}</Text>
            </View>
          )}
          {productImage && (
            <View style={style.itemContainer}>
              <Text style={style.imageHeading}>Product Image</Text>
              <Text style={style.imageName}>{productImage.fileName}</Text>
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
