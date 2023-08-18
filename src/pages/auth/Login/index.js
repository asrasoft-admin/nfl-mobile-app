/* eslint-disable quotes */
import React, {useState, useEffect} from 'react';
import style from './style';
import {
  View,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Text,
  Image,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {widthPercentageToDP as wp} from 'utils/responsive';
import {Input, Button, Dropdown, Header, Texture} from '../../../common';
import {useSelector, useDispatch} from 'react-redux';
import {loginAction} from '../../../Redux/Actions/userAction';
import {
  axiosInstance,
  baseURL,
  getLocation,
  parseError,
} from '../../../helpers';
import {SearchableDropdowns} from '../../../common/SearchableDropdown';
import {allActivities} from '../../../dummyData';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const Login = ({navigation}) => {
  const state = useSelector(states => states);
  const allAreas = state.allArea;
  const [isLoading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {errors} = formState;
  const dispatch = useDispatch();
  const [selectedArea, setSelectedArea] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // eslint-disable-next-line no-undef
    if (Platform.OS === 'ios') {
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Location permission denied', `Locataion is Required`, [
            {text: 'OK'},
          ]);
        }
      } catch (error) {
        parseError(error);
      }
    }
  });

  useEffect(() => {
    const areaItems = [];
    areaItems.push(...allAreas?.data);
    setAreas(areaItems);
  }, [allAreas.data]);

  const onSubmit = async data => {
    try {
      if (selectedArea) {
        if (data.number) {
          if (data.password) {
            setLoading(true);
            console.log({data});
            axios
              .get(`${baseURL}/api/auth/signin`, {
                params: {
                  number: data.number,
                  password: data.password,
                },
              })
              .then(async ({data: user}) => {
                console.log({user});
                setLoading(false);

                if (user.success) {
                  await AsyncStorage.setItem('@token', user.data.token, err => {
                    if (err) throw err;
                    dispatch(loginAction(user, selectedArea));
                    if (user.data.role === 'supervisor') {
                      navigation.navigate('SupervisorDetail');
                    } else if (user.data.role === 'consumer') {
                      navigation.navigate('RecordAudio');
                    } else {
                      navigation.navigate('ShopkeerDetail');
                    }
                  });
                }
              })
              .catch(error => {
                setLoading(false);
                parseError(error);
              });
          } else throw new Error('Password is Required');
        } else throw new Error('Number is Required');
      } else throw new Error('Area is Required');
    } catch (error) {
      parseError(error);
    }
  };

  const handleSelectArea = item => {
    setSelectedArea(item);
  };

  return (
    <View style={style.root}>
      <Texture />
      {/* <Header /> */}

      <View style={style.welcomeHeadingContainer}>
        <Text style={style.welcomeHeadingText}>
          Welcome To Door to Door Service Asra Soft
        </Text>
        <Text style={style.loginHeadingText}>LOGIN</Text>
      </View>

      <View style={style.container}>
        {/* <Dropdown
          control={control}
          name="activity_id"
          error={!!errors?.activity_id}
          message={errors?.activity_id?.message}
          containerStyles={style.formFields}
          items={allActivities}
        /> */}
        {/* <SearchableDropdowns
          items={areas}
          handleSelect={handleSelectArea}
          selectedItems={selectedArea}
          placeholder={selectedArea?.name ? selectedArea?.name : 'Area'}
        /> */}

        <Input
          ref={control}
          control={control}
          name="number"
          placeholder="Number"
          error={!!errors?.number}
          message={errors?.number?.message}
          containerStyles={style.formFields}
        />

        <Input
          ref={control}
          control={control}
          name="password"
          placeholder="Password"
          error={!!errors?.password}
          message={errors?.password?.message}
          isPassword
          containerStyles={style.formFields}
        />
        <Button
          label={!isLoading && 'Login'}
          primary={formState.isValid}
          icon={
            isLoading && (
              <ActivityIndicator
                style={{position: 'absolute', left: wp('36')}}
              />
            )
          }
          active={formState.isValid && !isLoading}
          onPress={handleSubmit(onSubmit)}
          containerStyles={style.formFields}
        />
      </View>
    </View>
  );
};
