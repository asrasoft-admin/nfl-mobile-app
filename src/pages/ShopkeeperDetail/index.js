/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, {useState, useEffect} from 'react';
import style from './style';
import {Text, View, BackHandler} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Input, Dropdown, Header, CheckBox, Texture, Button} from '../../common';
import {relations, mobileNetwork, winnersActivity} from '../../dummyData';
import {useDispatch, useSelector} from 'react-redux';
import {
  audioRecorderPlayer,
  axiosInstance,
  getLocation,
  numberValidation,
  otpCodeGenerator,
  parseError,
  stopRecording,
} from '../../helpers';
import CustomModal from '../../common/Modal';
import {TextInput} from 'react-native-gesture-handler';
import {otpCodeAction} from '../../Redux/Actions/customerDetail';
import {stopAudioRecording} from '../../Redux/Actions/RecordAudio';

export const ShopkeeperDetail = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const state = useSelector(state => state);
  const [location, setLocation] = useState(null);
  const user = state.user;
  const allAreas = state.allArea;
  const area = allAreas?.data?.filter(area => area.id === user.areaId);
  const [OTPSendLoading, setOTPSendLoading] = useState(false);
  const {otpCode} = useSelector(state => state.customerDetail);
  const [otpMessage, setOtpMessage] = useState({});
  const [isChangingOTPLabel, setIsChangingOTPLabel] = useState(false);

  const dispatch = useDispatch();

  const {control, handleSubmit, ref, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // defaultValues: {
    //   shopName: 'umer',
    //   address: 'idressi',
    //   mobile: 1,
    //   number: '923092462258',
    //   relationship: 1,
    //   terms: true,
    // },
  });
  const {errors} = formState;

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  const onShow = () => {
    return setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(!modalVisible);
    setLoading(false);
  };

  // const otpCode = Math.random().toString(36).slice(2, 6);

  const sendOTPHandler = async () => {
    const {number, terms, otp} = control._formValues;
    numberValidation(number);

    const genOtpCode = otpCodeGenerator();

    const sum = number?.slice(1, 11);
    const numRes = 92 + sum;

    try {
      setOTPSendLoading(true);
      const res = await axiosInstance.post('/customer/send-otp', {
        otp_code: genOtpCode,
        number: numRes,
      });
      dispatch(otpCodeAction(genOtpCode));

      console.log('=================== send otp', res.data);
      if (res.data.success) {
        setOtpMessage({message: res.data.message, success: res.data.success});
        setOTPSendLoading(false);
        setIsChangingOTPLabel(true);
      }

      if (!res.data.success) {
        setOtpMessage({message: res.data.message, success: res.data.success});
      }
    } catch (error) {
      setOTPSendLoading(false);
      setOtpMessage({message: error.message, success: false});
      dispatch(otpCodeAction(''));
      console.log(error?.message, 'otp error');
    }
    // console.log(number, terms, otp);
  };

  const onSubmit = async data => {
    console.log({data});
    const {number} = numberValidation(data);
    try {
      if (data.shopName && data.address) {
        if (data.mobile || number || data.relationship || data.terms) {
          if (data.mobile && number && data.relationship && data.terms) {
            if (!data.otp || otpCode == data.otp) {
              setLoading(true);
              dispatch(otpCodeAction(''));
              const {data: resData} = await axiosInstance.post(
                'shop-keeper/details',
                {
                  shop_name: data.shopName,
                  shop_address: data.address,
                  area_id: 1,
                  email: data.email,
                  mobile_network_id: data.mobile,
                  mobile_number: number,
                  relationship_id: data.relationship,
                  terms_agreed: data.terms,
                  user_id: user.id,
                  activity_id: user.activity_id,
                  coordinates: JSON.stringify(location),
                  otp_code: otpCode,
                },
              );
              if (resData.success) {
                setLoading(false);
                onClose();
                // navigation.navigate('OTPVerification', {
                //   id: resData?.data?.id,
                //   otpCode: otpCode,
                // });
                // navigation.navigate('ProductCheckList', {...route.params});
                navigation.navigate('ProductCheckList', {
                  id: resData?.data?.id,
                });
              }
            } else {
              setOtpMessage({message: 'Invalid OTP', success: false});
              onClose();
            }
          } else throw new Error('Please fill all details');
          setLoading(false);
        } else {
          setLoading(true);
          const {data: resData} = await axiosInstance.post(
            'shop-keeper/details',
            {
              shop_name: data.shopName,
              shop_address: data.address,
              area_id: data.area,
              user_id: user.id,
              activity_id: user.activity_id,
              coordinates: JSON.stringify(location),
              otp_code: otpCode,
            },
          );
          if (resData.success) {
            setLoading(false);
            onClose();
            navigation.navigate('SignOut');
          }
        }
      } else throw new Error('Please fill atleast Name and Address');
    } catch (error) {
      setLoading(false);
      parseError(error);
    }
  };

  const item = {value: false, description: 'I agree to term of service'};

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

  return (
    <View style={{height: '100%'}}>
      <Texture />
      <Header navigation={navigation} />
      <KeyboardAwareScrollView contentContainerStyle={[style.container]}>
        <View>
          <Text style={style.heading}>Shopkeeper Details</Text>
          <Input
            name="shopName"
            ref={control}
            control={control}
            placeholder="Shop Name"
            error={!!errors?.shopName}
            message={errors?.shopName?.message}
            containerStyles={style.inputContainer}
            returnKeyType={'next'}
          />
          <Input
            name="address"
            ref={control}
            control={control}
            placeholder="Shop Address Line 01"
            error={!!errors?.address}
            message={errors?.address?.message}
            containerStyles={style.inputContainer}
            returnKeyType={'next'}
          />
          <Dropdown
            name="area"
            control={control}
            error={!!errors?.area}
            message={errors?.area?.message}
            containerStyles={style.inputContainer}
            items={area}
            enabledFalse={true}
          />
          <Input
            name="email"
            keyboardType="email-address"
            ref={control}
            control={control}
            placeholder="E-mail ID (optional)"
            error={!!errors?.email}
            message={errors?.email?.message}
            containerStyles={style.inputContainer}
            returnKeyType={'next'}
          />

          <Dropdown
            name="mobile"
            control={control}
            error={!!errors?.mobile}
            message={errors?.mobile?.message}
            containerStyles={style.inputContainer}
            items={mobileNetwork}
          />
          {/* <Input
            name="number"
            ref={control}
            control={control}
            placeholder="Number 923XX-XXXXXXX"
            error={!!errors?.number}
            message={errors?.number?.message}
            containerStyles={style.inputContainer}
            keyboardType="numeric"
            maxLength={12}
            returnKeyType={'send'}
          /> */}

          <View style={style.numberInputMain}>
            <Input
              ref={control}
              control={control}
              name="number"
              placeholder="Number 923XX-XXXXXXX"
              error={!!errors?.number}
              message={errors?.number?.message}
              containerStyles={style.numberInputContainer}
              keyboardType="numeric"
              maxLength={12}
            />
            <Button
              containerStyles={style.otp}
              label={isChangingOTPLabel ? 'Resend OTP' : 'Send OTP'}
              onPress={sendOTPHandler}
              loading={OTPSendLoading}
            />
          </View>
          <Dropdown
            name="relationship"
            control={control}
            error={!!errors?.relationship}
            message={errors?.relationship?.message}
            containerStyles={style.inputContainer}
            items={relations}
          />
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

          {otpMessage?.message && (
            <View>
              <Text
                style={otpMessage.success ? {color: 'green'} : {color: 'red'}}>
                {otpMessage?.message}
              </Text>
            </View>
          )}
          <View style={style.product}>
            <CheckBox item={item} control={control} name="terms" />
          </View>
          <CustomModal
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            modalVisible={modalVisible}
            onShow={onShow}
            onClose={onClose}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
