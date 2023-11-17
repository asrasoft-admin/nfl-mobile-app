import React, {useState} from 'react';
import {Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import style from './style';
// import Svg, {Path} from 'react-native-svg';
import {SvgXml} from 'react-native-svg';

import {Controller} from 'react-hook-form';
import {colors} from '../../assets/colors';

const eyeSvgString = `
<svg xmlns="http://www.w3.org/2000/svg" id="eye"><path fill="none" d="M0 0h48v48H0z"></path><path d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path></svg>
`;

export const Input = ({
  error,
  isPassword,
  placeholder = 'Type here',
  message,
  control,
  name,
  defaultValue,
  containerStyles,
  keyboardType,
  editable = true,
  maxLength,
  ref,
  returnKeyType,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const InputComponent = ({field}) => {
    const {onChange, onBlur, value} = field;
    return (
      <View
        style={isPassword ? {flexDirection: 'row', alignItems: 'center'} : {}}>
        <TextInput
          ref={ref}
          onChangeText={e => onChange(e)}
          onBlur={onBlur}
          value={value}
          secureTextEntry={!showPassword && isPassword}
          style={[
            style.input,
            {backgroundColor: editable ? colors.backgroundColor : colors.gray3},
          ]}
          placeholder={placeholder}
          underlineColorAndroid={'transparent'}
          keyboardType={!!keyboardType ? keyboardType : 'default'}
          editable={editable}
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          maxLength={maxLength}
          returnKeyType={!!returnKeyType ? returnKeyType : 'default'}
        />
        {isPassword && (
          <TouchableOpacity
            style={style.showPassImgContainer}
            onPress={togglePasswordVisibility}>
            <Image
              source={
                !showPassword
                  ? require('../../assets/images/closeEye.png')
                  : require('../../assets/images/openEye.png')
              }
              style={style.showPassImg}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const field = {
    onChange: () => {},
    onBlur: () => {},
  };
  return (
    <View style={[style.container, containerStyles && containerStyles]}>
      {control ? (
        <Controller
          control={control}
          render={InputComponent}
          name={name}
          defaultValue={defaultValue}
        />
      ) : (
        <InputComponent field={field} />
      )}

      {error && <Text style={style.textError}>{message}</Text>}
    </View>
  );
};
