import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import style from './style';
import {Text, View, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Input, Dropdown, Header, CheckBox, Texture, Button} from '../../common';
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
import {stopAudioRecording} from '../../Redux/Actions/RecordAudio';

export const CustomerDetail = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const state = useSelector(state => state);
  const user = state.user;
  const allArea = state.allArea;
  const area = allArea?.data?.filter(area => area.id === user.areaId);
  const [disclaimer, setDisclaimer] = useState(false);
  const [location, setLocation] = useState(null);

  const {isRecording, audio} = useSelector(state => state.Recorder);
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

  const onShow = () => {
    return setModalVisible(true);
  };

  const onClose = () => {
    return setModalVisible(!modalVisible);
  };

  const onSubmit = async data => {
    const otpCode = otpCodeGenerator();
    const {number} = numberValidation(data);

    try {
      if (!disclaimer) {
        try {
          const audioPath = await stopRecording();
          dispatch(stopAudioRecording(audioPath));
          setLoading(true);
          const downloadLink = await uploadAudioToCloudinary(
            audioPath || audio,
          );
          console.log({downloadLink});
          return await axiosInstance.post('/customer/details', {
            user_id: user.id,
            activity_id: user.activity_id,
            coordinates: JSON.stringify(location),
            audio: downloadLink,
            city: data.city,
            no_response: false,
            audio_record_time: new Date().getTime(),
            audio_record_date: new Date(),
          });
        } catch (error) {
          throw new Error(error);
        } finally {
          setLoading(false);
        }
      }
      if (data.name && data.address) {
        if (
          data.gender ||
          data.mobile ||
          data.number ||
          data.relationship ||
          data.prevBrand ||
          data.terms
        ) {
          if (
            data.gender &&
            data.mobile &&
            data.number &&
            data.relationship &&
            data.prevBrand &&
            data.terms
          ) {
            setLoading(true);
            const {data: resData} = await postDetails(data, otpCode, number);

            if (resData.success) {
              setLoading(false);
              onClose();
              navigation.navigate('OTPVerification', {
                id: resData?.data?.id,
                otpCode: otpCode,
              });
            }
          } else throw new Error('Please fill all details');
        } else {
          setLoading(true);
          const {data: resData} = await axiosInstance.post(
            '/customer/details',
            {
              name: data.name,
              address: data.address,
              area_id: data.area,
              user_id: user.id,
              activity_id: user.activity_id,
              coordinates: JSON.stringify(location),
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

  const termsOfService = {
    value: false,
    description: 'I agree to term of service',
  };

  return (
    <View style={style.root}>
      <Texture />
      <Header navigation={navigation} />
      <ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={[style.container]}>
          <Text style={style.heading}> Customer Details </Text>

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
              textStyle={{color: 'white'}}
              initial={2}
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
            </>
          )}

          <Button containerStyles={style.otp} label="Send OTP" />
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
