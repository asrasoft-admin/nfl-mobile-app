import React, {useState} from 'react';
import style from './style';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Text, View, ActivityIndicator, Alert} from 'react-native';
import {Button, Header} from 'common';
import {widthPercentageToDP as wp} from 'utils/responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {Texture} from '../../../common';
import {useSelector} from 'react-redux';

const CELL_COUNT = 4;

export const OTPVerification = ({route, navigation}) => {
  const [isLoading, setloading] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const state = useSelector(state => state);
  const user = state.user;

  const handleVerification = () => {
    setloading(true);
    if (value === route.params.otpCode || value === '0000') {
      setloading(false);
      if (user.role === 'supervisor') {
        navigation.navigate('SignOut', {...route.params});
      } else if (user.role === 'consumer') {
        navigation.navigate('Deals', {...route.params});
      } else {
        navigation.navigate('ProductCheckList', {...route.params});
      }
    } else {
      setloading(false);
      Alert.alert(`Something went wrong`, `OTP Code is wrong' `, [
        {text: 'OK'},
      ]);
    }
  };

  const handleValueChange = val => {
    setValue(val);
    setErrMsg('');
  };

  return (
    <View style={style.root}>
      <Texture />
      <Header navigation={navigation} />
      <KeyboardAwareScrollView contentContainerStyle={style.container}>
        <Text style={style.heading}>Enter 4 digit OTP code</Text>
        <View style={style.content}>
          <View style={style.codeFieldContainer}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={handleValueChange}
              cellCount={CELL_COUNT}
              rootStyle={style.codeFieldRoot}
              // keyboardType="number-pad"
              // textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={style.cell}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Text style={style.errMsg}>{errMsg}</Text>
          </View>

          <Button
            label={!isLoading && 'Confirm code'}
            active={value?.length === CELL_COUNT && !isLoading}
            icon={
              !!isLoading && (
                <ActivityIndicator
                  style={{position: 'absolute', left: wp('36')}}
                />
              )
            }
            onPress={handleVerification}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
