import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style';
import {
  Text,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Input, Dropdown, Header, CheckBox, Texture, Button } from '../../common';
import {
  gender,
  relations,
  mobileNetwork,
  prevBrand,
  city,
} from '../../dummyData';
import {
  axiosInstance,
  getLocation,
  numberValidation,
  parseError,
  otpCodeGenerator,
  stopRecording,
} from '../../helpers';
import CustomModal from '../../common/Modal';
import RadioButtonRN from 'radio-buttons-react-native';
import uploadAudioToCloudinary from '../../services/cloudinary/Cloudinary';
import {
  recordSuccess,
  stopAudioRecording,
  uploadSuccess,
} from '../../Redux/Actions/RecordAudio';
import { setCustomerDetails } from '../../Redux/Actions/customer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const CustomerDetail = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [noResModalVisible, setNoResModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const state = useSelector(state => state);
  const user = state.user;
  const allArea = state.allArea;
  const area = allArea?.data?.filter(area => area.id === user.areaId);
  const [disclaimer, setDisclaimer] = useState(false);
  const [location, setLocation] = useState(null);

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

  const { control, handleSubmit, ref, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    // defaultValues: {
    //   name: 'umer',
    //   address: 'liaquatabd',
    //   gender: 'male',
    //   mobile: 1,
    //   number: '923102772589',
    //   relationship: 1,
    //   prevBrand: 1,
    //   terms: true,
    // },
  });

  const { errors } = formState;

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

  const onShow = () => {
    return setModalVisible(true);
  };

  useEffect(() => {
    console.log({ audio, downloadUrl });
  }, [audio, downloadUrl]);

  const onClose = () => {
    return setModalVisible(!modalVisible);
  };
  const onNoResClose = () => {
    return setNoResModalVisible(!modalVisible);
  };

  const onNoResShow = () => {
    return setNoResModalVisible(true);
  };

  const noResponseHandle = async () => {
    console.log('======================================> no response');
    try {
      let audioPath, downloadLink;
      setLoading(true);
      if (audio) {
        audioPath = audio;
      } else {
        audioPath = await stopRecording();
        dispatch(stopAudioRecording(audioPath));
      }
      if (downloadUrl) {
        downloadLink = downloadUrl;
        console.log({ downloadUrl });
      } else {
        downloadLink = await uploadAudioToCloudinary(audioPath);
        dispatch(uploadSuccess(downloadLink));
      }
      console.log('no Response');
      const res = await axiosInstance.post('/customer/details', {
        user_id: user.id,
        activity_id: user.activity_id,
        coordinates: JSON.stringify(location),
        audio: downloadLink,
        no_response: true,
        audio_record_time: new Date().getTime(),
        audio_record_date: new Date(),
      });
      if (res.data.success) {
        dispatch(recordSuccess());
        onNoResClose();
        navigation.navigate('SignOut');
      }
      console.log({ res });
      return res;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async data => {
    const otpCode = otpCodeGenerator();
    const { number } = numberValidation(data);
    console.log('===========>', audio, downloadUrl);
    try {
      if (!disclaimer) {
        console.log('==>' + { disclaimer });
        try {
          let audioPath, downloadLink;
          console.log({ downloadUrl });
          setLoading(true);
          if (audio) {
            audioPath = audio;
          } else {
            audioPath = await stopRecording();
            dispatch(stopAudioRecording(audioPath));
          }
          if (Boolean(downloadUrl)) {
            downloadLink = downloadUrl;
          } else {
            downloadLink = await uploadAudioToCloudinary(audioPath);
            dispatch(uploadSuccess(downloadLink));
          }

          const res = await axiosInstance.post('/customer/details', {
            user_id: user.id,
            activity_id: user.activity_id,
            coordinates: JSON.stringify(location),
            audio: downloadLink,
            city: data.city,
            previous_brand_id: data.prevBrand,
            no_response: false,
            audio_record_time: new Date().getTime(),
            audio_record_date: new Date(),
          });
          if (res.data.success) {
            dispatch(recordSuccess());
            onClose();
            navigation.navigate('SignOut');
          }
          console.log({ res });
          return res;
        } catch (error) {
          throw new Error(error);
        } finally {
          setLoading(false);
        }
      } else {
        if (data.name && data.number && data.prevBrand && data.terms) {
          try {
            const details = {
              user_id: user.id,
              activity_id: user.activity_id,
              coordinates: JSON.stringify(location),
              name: data.name,
              mobile_number: data.number,
              city: data.city,
              no_response: false,
              previous_brand_id: data.prevBrand,
            };
            dispatch(setCustomerDetails(details));
            onClose();
            navigation.navigate('Deals');
          } catch (error) {
            throw new Error(error);
          } finally {
            setLoading(false);
          }
        } else throw new Error('Please Enter Complete Information');
      }
    } catch (error) {
      setLoading(false);
      parseError(error);
    }
  };

  const termsOfService = {
    value: false,
    description: 'I agree to term of service',
  };

  return (
    <View
      style={style.root}>
      <Texture />
      <Header navigation={navigation} />
      <ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={[style.container]}>
          <Text style={style.heading}> Customer Details </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              marginBottom: 7,
            }}>
            <CustomModal
              isLoading={isLoading}
              label="No Response"
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
            <Text style={style.radio}> Disclaimer </Text>
            <RadioButtonRN
              data={data}
              box={false}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              initial={2}
              deactiveColor="black"
              activeColor="#4D11A4"
              selectedBtn={e =>
                e.label === 'Yes'
                  ? setDisclaimer(true)
                  : setDisclaimer(false)
              }
            />
          </View>

          {disclaimer && (
            <>
              <Input
                ref={ref}
                control={control}
                name="name"
                placeholder="Customer Name"
                error={!!errors?.name}
                message={errors?.name?.message}
                containerStyles={style.inputContainer}
              />

              <Input
                ref={control}
                control={control}
                name="number"
                placeholder="Number 923XX-XXXXXXX"
                error={!!errors?.number}
                message={errors?.number?.message}
                containerStyles={style.inputContainer}
                keyboardType="numeric"
                maxLength={12}
              />

              <Input
                ref={ref}
                control={control}
                name="otp"
                placeholder="Enter OTP"
                error={!!errors?.otp}
                message={errors?.otp?.message}
                containerStyles={style.inputContainer}
              />
              <View style={style.product}>
                <CheckBox
                  item={termsOfService}
                  control={control}
                  name="terms"
                />
              </View>

              <Button containerStyles={style.otp} label="Send OTP" />
            </>
          )}
          <CustomModal
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            modalVisible={modalVisible}
            onShow={onShow}
            onClose={onClose}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};
