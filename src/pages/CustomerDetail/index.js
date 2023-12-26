import React, {useState, useEffect, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import style from './style';
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Input, Dropdown, Header, CheckBox, Texture, Button} from '../../common';
import {
  gender,
  relations,
  mobileNetwork,
  prevBrand,
  city,
  ageList,
} from '../../dummyData';
import {
  axiosInstance,
  getLocation,
  numberValidation,
  parseError,
  otpCodeGenerator,
  stopRecording,
  audioRecorderPlayer,
  getAreaFromAPI,
  handleSync,
} from '../../helpers';
import CustomModal from '../../common/Modal';
import RadioButtonRN from 'radio-buttons-react-native';
import uploadAudioToCloudinary from '../../services/cloudinary/Cloudinary';
import {
  recordSuccess,
  stopAudioRecording,
  uploadSuccess,
} from '../../Redux/Actions/RecordAudio';
import {setCustomerDetails} from '../../Redux/Actions/customer';
import {getOTPId, otpCodeAction} from '../../Redux/Actions/customerDetail';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {saveUser} from '../../Redux/Actions/allUsers';
import axios from 'axios';
import config from '../../config';
import {widthPercentageToDP} from '../../utils/responsive';

const CustomerDetail = memo(({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [noResModalVisible, setNoResModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingTwo, setIsLoadingTwo] = useState(false);
  const syncDataFeatureFlag = config.featureFlags.syncDataFeature;
  const otpByPassFeature = config.featureFlags.otpByPassFeature;

  const state = useSelector(state => state);
  const user = state.user;
  const allArea = state.allArea;
  let area = allArea?.data?.find(area => area.name === user.area);
  const [disclaimer, setDisclaimer] = useState(false);
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [OTPSendLoading, setOTPSendLoading] = useState(false);
  const {otpCode, id} = useSelector(state => state.customerDetail);
  const [otpMessage, setOtpMessage] = useState({});
  const [isChangingOTPLabel, setIsChangingOTPLabel] = useState(false);
  const {area: myArea} = useSelector(state => state.allArea);
  const [timer, setTimer] = useState(30); // Initial timer value in seconds
  const [showTimer, setShowTimer] = useState(false);
  console.log('===================== COMPONENT RENDER ===================== ');

  const {
    isRecording,
    audioPath: audio,
    downloadLink: downloadUrl,
  } = useSelector(state => state.Recorder);
  const dispatch = useDispatch();
  const data = [
    {
      label: 'Yes',
    },
    {
      label: 'No',
    },
  ];
  const {control, handleSubmit, ref, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {errors} = formState;

  const postDetails = async (data, otpCode, number) => {
    return await axiosInstance.post('/customer/details', {
      name: data.name,
      gender: data.gender,
      previous_brand_id: data.prevBrand,
      address: data.address,
      area_id: data.area,
      email: data.email,
      mobile_network_id: data.mobile,
      mobile_number: number ? number : null,
      relationship_id: data.relationship,
      terms_agreed: data.terms,
      user_id: user.id,
      activity_id: user.activity_id,
      coordinates: JSON.stringify(location),
      otp_code: otpCode,
    });
  };

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  useEffect(() => {
    let interval;

    if (showTimer) {
      interval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      if (timer === 0) {
        setIsChangingOTPLabel(true);
        setShowTimer(false);
      }
    }

    return () => clearInterval(interval);
  }, [timer, showTimer]);

  const onShow = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    console.log({audio, downloadUrl});
  }, [audio, downloadUrl]);

  const onClose = () => {
    setModalVisible(false);
  };
  const onNoResClose = () => {
    return setNoResModalVisible(!noResModalVisible);
  };

  const onNoResShow = () => {
    return setNoResModalVisible(true);
  };

  const noResponseHandle = async () => {
    console.log('======================================> no response');

    let audioPath, downloadLink;
    try {
      setIsLoadingTwo(true);
      if (audio) {
        audioPath = audio;
      } else {
        audioPath = await stopRecording();
        dispatch(stopAudioRecording(audioPath));
      }
      // if (Boolean(downloadUrl)) {
      //   downloadLink = downloadUrl;
      // } else {
      //   downloadLink = await uploadAudioToCloudinary(audioPath);
      //   if (!downloadLink)
      //     throw new Error('Something went wrong in recording audio');
      //   dispatch(uploadSuccess(downloadLink));
      // }
      const data = await getAreaFromAPI(location);

      const cusData = {
        user_id: user.id,
        activity_id: user.activity_id,
        coordinates: JSON.stringify({
          latitude: location?.latitude,
          longitude: location?.longitude,
        }),
        no_response: true,
        audioPath,
        audio_record_time: new Date().getTime(),
        audio_record_date: new Date(),
        area_id: 1,
        area: myArea,
        location: data.displayName,
        deals: [],
      };

      if (user?.role === 'consumer') {
        if (syncDataFeatureFlag) {
          dispatch(saveUser(cusData));
        } else {
          await handleSync([cusData]);
        }
      }

      dispatch(recordSuccess());
      navigation.navigate('SignOut');
      setIsLoadingTwo(false);
      onNoResClose();
      // if (downloadUrl) {
      //   downloadLink = downloadUrl;
      //   console.log({downloadUrl});
      // } else {
      //   downloadLink = await uploadAudioToCloudinary(audioPath);
      //   dispatch(uploadSuccess(downloadLink));
      // }
      // console.log('no Response');
      //   const res = await axiosInstance.post('/customer/details', {
      //     user_id: user.id,
      //     activity_id: user.activity_id,
      //     coordinates: JSON.stringify({
      //       latitude: location?.latitude,
      //       longitude: location?.longitude,
      //     }),
      //     audio: downloadLink,
      //     no_response: true,
      //     audio_record_time: new Date().getTime(),
      //     audio_record_date: new Date(),
      //     area_id: area?.id,

      //   });
      //   if (res.data.success) {
      //     dispatch(recordSuccess());
      //     onNoResClose();
      //     navigation.navigate('SignOut');
      //   }
      //   console.log({res});
      //   return res;
    } catch (error) {
      if (!error.response) {
        setIsLoadingTwo(false);
        onNoResClose();
        return parseError({message: 'No internet connection'});
      }

      onNoResClose();
      throw new Error(error);
    } finally {
      setIsLoadingTwo(false);
    }
  };

  const verifyOTPHandler = async data => {
    try {
      // console.log(res, id);
      const res = await axiosInstance.get('/customer/verify-otp', {
        params: {
          id: id,
          otp: data.otp,
        },
      });

      // console.log(id, data.data);
      // console.log(res.data);

      if (res.data.success) {
        console.log(res, 'otp verify res');
        return data;
      }
    } catch (error) {
      if (!error.response) {
        return parseError({message: 'No internet connection'});
      }
      console.log(error, 'otp verify error');
      onClose();
      parseError(error);
    }
  };

  const sendOTPHandler = async () => {
    const {number, terms, otp, name} = control._formValues;
    const {valid} = numberValidation({number});

    const genOtpCode = otpCodeGenerator();

    const sum = number?.slice(1, 11);
    const numRes = 92 + sum;

    if (!name) {
      return parseError({message: 'Customer Name is required for send otp'});
    }

    if (!number) {
      return parseError({message: 'Customer Number is required for send otp'});
    }

    if (valid) {
      try {
        setOTPSendLoading(true);
        const res = await axiosInstance.post('/customer/send-otp', {
          otp_code: genOtpCode,
          number: numRes,
          name: name,
        });
        dispatch(otpCodeAction(genOtpCode));

        console.log(res.data);

        if (res) {
          dispatch(getOTPId(res.data.id));
          setOtpMessage({message: res.data.message, success: res.data.success});
          setOTPSendLoading(false);
          setTimer(60);
          setShowTimer(true);
        }

        if (!res.data.success) {
          setOtpMessage({message: res.data.message, success: res.data.success});
        }
      } catch (error) {
        if (!error.response) {
          setOTPSendLoading(false);
          parseError({message: 'No internet connection'});
          // You can handle the network error here, such as showing a message to the user
        } else {
          // Handle other types of errors
          setOTPSendLoading(false);
          console.log(error.response.data.message);
          setOtpMessage({message: error.response.data.message, success: false});
          console.log(error, 'otp error');
        }
      }
    }
    // console.log(number, terms, otp);
  };

  const onSubmit = async data => {
    setLoading(true);
    // const otpCode = otpCodeGenerator();
    const {number} = numberValidation(data);
    // console.log('===========>', audio, downloadUrl);
    const locationData = await getAreaFromAPI(location);

    console.log('again run?');

    try {
      if (!data.prevBrand) {
        onClose();
        setLoading(false);
        return parseError({message: 'Atlest select previous brand'});
      }

      if (!disclaimer && !!data.prevBrand) {
        // console.log('==>' + {disclaimer});
        try {
          let audioPath, downloadLink;
          console.log({downloadUrl});
          setLoading(true);
          if (audio) {
            audioPath = audio;
          } else {
            audioPath = await stopRecording();
            dispatch(stopAudioRecording(audioPath));
          }
          // if (Boolean(downloadUrl)) {
          //   downloadLink = downloadUrl;
          // } else {
          //   downloadLink = await uploadAudioToCloudinary(audioPath);
          //   if (!downloadLink)
          //     throw new Error('Something went wrong in recording audio');
          //   dispatch(uploadSuccess(downloadLink));
          // }
          // save the customer to the memory to be sync late

          const cusData = {
            user_id: user.id,
            activity_id: user.activity_id,
            coordinates: JSON.stringify(location),
            city: 'karachi',
            audioPath,
            previous_brand_id: data.prevBrand,
            no_response: false,
            audio_record_time: new Date().getTime(),
            audio_record_date: new Date(),
            area_id: 1,
            area: myArea,
            location: locationData.displayName,
            address: data.address,
            deals: [],
          };
          try {
            // if (user?.role === 'consumer') {
            //   // dispatch(saveUser(cusData));
            //   await handleSync([cusData]);
            // }

            if (user?.role === 'consumer') {
              if (syncDataFeatureFlag) {
                dispatch(saveUser(cusData));
              } else {
                await handleSync([cusData]);
              }
            }

            dispatch(recordSuccess());
            setLoading(false);
            navigation.navigate('SignOut');
            onClose();
          } catch (error) {
            onClose();
            setLoading(false);
            parseError(error);
          } finally {
            setLoading(false);
            console.log('helllo===============>', {modalVisible});
          }
        } catch (error) {
          console.log({mysetError: error});
          if (!error.response) {
            onClose();
            setLoading(false);
            return parseError({message: 'No internet connection'});
          }

          onClose();
          if (
            error.message ===
            "ENOENT:  (No such file or directory), open 'Already stopped'"
          ) {
            return null;
          }
          setLoading(false);
          parseError(error);
        }
      } else {
        if (
          data.number &&
          data.terms &&
          !!data.prevBrand &&
          data.address &&
          data.name &&
          !!data.age &&
          !!data.gender &&
          (!otpByPassFeature || data.otp)
        ) {
          setLoading(true);
          try {
            const details = {
              user_id: user.id,
              activity_id: user.activity_id,
              coordinates: JSON.stringify(location),
              name: data.name,
              last_name: data.lastName,
              mobile_number: data.number,
              age: data.age,
              gender: data.gender,
              city: 'karachi',
              no_response: false,
              previous_brand_id: data.prevBrand,
              otp: data.otp || null,
              location: locationData.displayName,
              area_id: 1,
              area: myArea,
              address: data?.address,
            };
            const res = await verifyOTPHandler(data);
            if (res) {
              console.log(res);
              // console.log(res, 'res of verify otp');
              dispatch(setCustomerDetails(details));
              onClose();
              setLoading(false);
              navigation.navigate('Deals');
            }
          } catch (error) {
            if (!error.response) {
              onClose();
              setLoading(false);
              return parseError({message: 'No internet connection'});
            }
            console.log(error, '1');

            if (
              error.message ===
              "ENOENT:  (No such file or directory), open 'Already stopped'"
            ) {
              return null;
            }
            parseError(error);
            onClose();
          } finally {
            setLoading(false);
          }
        } else {
          parseError({message: 'Please Enter Complete Information'});
          onClose();
          setLoading(false);
        }
      }
    } catch (error) {
      if (!error.response) {
        onClose();
        setLoading(false);
        return parseError({message: 'No internet connection'});
      }
      console.log(error, '2');

      if (
        error.message ===
        "ENOENT:  (No such file or directory), open 'Already stopped'"
      ) {
        return null;
      }
      parseError(error);
      onClose();
      console.log('erro 4');
    }
  };

  const termsOfService = {
    value: false,
    description: 'I agree to term of service',
  };

  const handleRecordAudio = async () => {
    try {
      if (audioRecorderPlayer) {
        await stopRecording();
        dispatch(stopAudioRecording());
        audioRecorderPlayer.removeRecordBackListener(e => {
          // console.log('Recording . . . ', e.currentPosition);
          return;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disableBackButton = () => {
    handleRecordAudio();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
  }, []);

  useEffect(() => {
    if (OTPSendLoading === false) {
      setTimeout(() => {
        setOtpMessage({});
      }, 5000);
    }
  }, [OTPSendLoading]);

  const getArea = async () => {
    const locationData = await getAreaFromAPI(location);
    setUserLocation(locationData ? locationData.displayName : 'Loading...');
  };

  useEffect(() => {
    if (location) {
      getArea();
    }
  }, [location]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <Texture />
      <Header navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <KeyboardAwareScrollView
          contentContainerStyle={[style.container]}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}>
          <Text style={style.heading}> Customer Details </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              marginBottom: 7,
            }}>
            <CustomModal
              isLoading={isLoadingTwo}
              label="No Response"
              customer
              onPress={noResponseHandle}
              modalVisible={noResModalVisible}
              onShow={onNoResShow}
              onClose={onNoResClose}
            />
          </View>

          <Dropdown
            control={control}
            name="city"
            error={!!errors?.city}
            message={errors?.city?.message}
            containerStyles={style.inputContainer}
            items={city}
          />

          <Dropdown
            control={control}
            name="prevBrand"
            error={!!errors?.prevBrand}
            message={errors?.prevBrand?.message}
            containerStyles={style.inputContainer}
            items={prevBrand}
          />

          <View style={style.radioContainer}>
            <Text style={style.radio}> Is customer buying </Text>
            <RadioButtonRN
              data={data}
              box={false}
              textStyle={{color: 'black', fontWeight: 'bold'}}
              initial={2}
              deactiveColor="black"
              activeColor="#4D11A4"
              selectedBtn={e =>
                e.label === 'Yes' ? setDisclaimer(true) : setDisclaimer(false)
              }
            />
          </View>

          {disclaimer && (
            <>
              <Input
                ref={ref}
                control={control}
                name="name"
                placeholder="First Name"
                error={!!errors?.name}
                message={errors?.name?.message}
                containerStyles={style.inputContainer}
              />

              <Input
                ref={ref}
                control={control}
                name="lastName"
                placeholder="Last Name (optional)"
                error={!!errors?.name}
                message={errors?.name?.message}
                containerStyles={style.inputContainer}
              />

              <Dropdown
                control={control}
                name="age"
                error={!!errors?.age}
                message={errors?.age?.message}
                containerStyles={style.inputContainer}
                items={ageList}
              />

              <Dropdown
                control={control}
                name="gender"
                error={!!errors?.gender}
                message={errors?.gender?.message}
                containerStyles={style.inputContainer}
                items={gender}
              />

              <Input
                ref={ref}
                control={control}
                name="address"
                placeholder="Address"
                error={!!errors?.name}
                message={errors?.name?.message}
                containerStyles={style.inputContainer}
              />

              <Input
                ref={ref}
                control={control}
                name="location"
                placeholder="Location"
                error={!!errors?.name}
                message={errors?.name?.message}
                containerStyles={style.inputContainer}
                defaultValue={userLocation}
                editable={false}
              />

              <View style={style.numberInputMain}>
                <Input
                  ref={control}
                  control={control}
                  name="number"
                  placeholder="Number 03XX-XXXXXXX"
                  error={!!errors?.number}
                  message={errors?.number?.message}
                  containerStyles={[
                    style.numberInputContainer,
                    otpByPassFeature ? {} : {width: widthPercentageToDP(90)},
                  ]}
                  keyboardType="numeric"
                  maxLength={11}
                />
                {otpByPassFeature && (
                  <Button
                    containerStyles={style.otp}
                    label={
                      isChangingOTPLabel && !showTimer
                        ? 'Resend OTP'
                        : 'Send OTP'
                    }
                    onPress={sendOTPHandler}
                    loading={OTPSendLoading}
                    disabled={showTimer || OTPSendLoading}
                  />
                )}
                {showTimer && <Text>{timer}</Text>}
              </View>

              {otpByPassFeature && (
                <Input
                  ref={ref}
                  control={control}
                  name="otp"
                  keyboardType="numeric"
                  placeholder="Enter OTP"
                  error={!!errors?.otp}
                  message={errors?.otp?.message}
                  containerStyles={style.inputContainer}
                />
              )}

              <View>
                <Text
                  style={
                    otpMessage.success ? {color: 'green'} : {color: 'red'}
                  }>
                  {otpMessage?.message}
                </Text>
              </View>

              <View style={style.product}>
                <CheckBox
                  item={termsOfService}
                  control={control}
                  name="terms"
                />
              </View>
            </>
          )}

          <CustomModal
            isLoading={isLoading}
            isLoadingTwo={isLoadingTwo}
            customer
            onPress={() => {
              if (!isLoading) {
                handleSubmit(onSubmit)();
              }
            }}
            modalVisible={modalVisible}
            onShow={onShow}
            onClose={onClose}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default CustomerDetail;
