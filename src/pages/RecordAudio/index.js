import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
  BackHandler,
  Text,
} from 'react-native';
// import uploadAudioToCloudinary from './CloudinaryUploader';
import {Button, Header, Texture} from '../../common';
import style from './style';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {startRecording} from '../../Redux/Actions/RecordAudio';
import {useDispatch, useSelector} from 'react-redux';
import {widthPercentageToDP as wp} from '../../utils/responsive';
import {
  audioRecorderPlayer,
  fetchDeals,
  getAreaFromAPI,
  getLocation,
  handleSync,
  parseError,
} from '../../helpers';

import {emptyList, saveUser} from '../../Redux/Actions/allUsers';
import {storeDeals} from '../../Redux/Actions/deals';
import {setArea} from '../../Redux/Actions/area';
import axios from 'axios';
import config from '../../config';

// const audioRecorderPlayer = new AudioRecorderPlayer();

export const RecordAudio = () => {
  const [audioPath, setAudioPath] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);

  const syncDataFeatureFlag = config.featureFlags.syncDataFeature;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isRecording} = useSelector(state => state.Recorder);
  const {allCustomersDetails, loading} = useSelector(
    state => state.allCustomers,
  );
  const [isActiveScreen, setIsActiveScreen] = useState(false);
  const [progressLoading, setProgressLoading] = useState('0%');
  const [location, setLocation] = useState(null);
  const state = useSelector(state => state);
  const {area} = useSelector(state => state.allArea);
  const user = state.user;

  const handleBackPress = () => {
    if (isActiveScreen) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [isActiveScreen]);

  useEffect(() => {
    const onFocus = () => {
      setIsActiveScreen(true);
    };

    const onBlur = () => {
      setIsActiveScreen(false);
    };

    const focusListener = navigation.addListener('focus', onFocus);
    const blurListener = navigation.addListener('blur', onBlur);

    return () => {
      focusListener.remove();
      blurListener.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await checkPermissions();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const {data} = await fetchDeals(user);
        dispatch(storeDeals(data));
      }
    })();
  }, [user]);

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

  // sync function --
  const onClick = async () => {
    try {
      setSyncLoading(true);
      console.log({allCustomersDetails});
      const data = await handleSync(allCustomersDetails);
      console.log('============================>', data);
      if (data && data?.success) {
        // dispatch(emptyList());
        console.log('hello');
        Alert.alert(
          'Data Sync Completed',
          `${allCustomersDetails?.length} ${
            allCustomersDetails?.length > 1 ? 'items' : 'item'
          } have been synced successfully`,
          [{text: 'OK'}],
        );
      }

      setSyncLoading(false);
    } catch (error) {
      parseError(error);
      setSyncLoading(false);
    }
  };

  const handleRecordAudio = async () => {
    try {
      console.log('asdasd');
      if (audioRecorderPlayer !== null) {
        const path = await audioRecorderPlayer.startRecorder();
        if (path) dispatch(startRecording());
        audioRecorderPlayer.addRecordBackListener(e => {
          // console.log('Recording . . . ', e.currentPosition);
          return;
        });
        if (state?.user?.role === 'shopkeeper') {
          navigation.navigate('ShopkeerDetail');
        } else {
          navigation.navigate('CustomerDetail');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  useEffect(() => {
    (async () => {
      if (location) {
        const data = await getAreaFromAPI(location);
        console.log({data});
        if (data.address) {
          dispatch(setArea(data.address));
        }
      }
    })();
  }, [location]);

  useEffect(() => {
    if (loading) {
      setProgressLoading(loading);
    }
  }, [loading]);

  // const getSomeData = async () => {
  //   if (location) {

  //     console.log({formattedAddress, area, firstResult});
  //   }
  // };

  // useEffect(() => {
  //   getSomeData();
  // }, [location]);

  if (!user.authenticated) {
    return null;
  }
  return (
    <View style={style.root}>
      <Texture />
      <Header />
      <View style={style.container}>
        <Button
          label="Start Form"
          onPress={handleRecordAudio}
          containerStyles={style.viewSummary}
        />
        <Button
          label="View your record"
          onPress={() => navigation.navigate('UserSummary')}
          containerStyles={style.viewSummary}
        />
        {syncDataFeatureFlag && (
          <Button
            containerStyles={style.viewSummary}
            label={
              syncLoading ? 'Syncing data... ' + progressLoading : 'Sync Data'
            }
            disabled={syncLoading}
            onPress={() => onClick()}
          />
        )}
      </View>
    </View>
  );
};
