/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, {useState, useEffect} from 'react';
import style from './style';
import {Text, View, BackHandler} from 'react-native';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Input, Dropdown, Header, CheckBox, Texture} from '../../common';
import {relations, mobileNetwork, winnersActivity} from '../../dummyData';
import {useSelector} from 'react-redux';
import {
  axiosInstance,
  getLocation,
  numberValidation,
  parseError,
} from '../../helpers';
import CustomModal from '../../common/Modal';
import {TextInput} from 'react-native-gesture-handler';

export const ShopkeeperDetail = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const state = useSelector(state => state);
  const [location, setLocation] = useState(null);
  const user = state.user;
  const allAreas = state.allArea;
  const area = allAreas?.data?.filter(area => area.id === user.areaId);

  const {control, handleSubmit, formState} = useForm({
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
    return setModalVisible(!modalVisible);
  };

  const otpCode = Math.random().toString(36).slice(2, 6);

  const onSubmit = async data => {
    const {number} = numberValidation(data);
    try {
      if (data.shopName && data.address) {
        if (data.mobile || number || data.relationship || data.terms) {
          if (data.mobile && number && data.relationship && data.terms) {
            setLoading(true);
            const {data: resData} = await axiosInstance.post(
              '/shop-keeper/details',
              {
                shop_name: data.shopName,
                shop_address: data.address,
                area_id: data.area,
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
              navigation.navigate('OTPVerification', {
                id: resData?.data?.id,
                otpCode: otpCode,
              });
            }
          } else throw new Error('Please fill all details');
        } else {
          setLoading(true);
          const {data: resData} = await axiosInstance.post(
            '/shop-keeper/details',
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

  const disableBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
  }, []);

  return (
    <View>
      <Texture />
      <Header navigation={navigation} />
      <KeyboardAwareScrollView contentContainerStyle={[style.container]}>
        <View>
          <Text style={style.heading}>Shopkeer Details</Text>
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
          <Input
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
          />
          <Dropdown
            name="relationship"
            control={control}
            error={!!errors?.relationship}
            message={errors?.relationship?.message}
            containerStyles={style.inputContainer}
            items={relations}
          />
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
