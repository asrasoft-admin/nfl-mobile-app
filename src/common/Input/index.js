import React from 'react';
import {Text, TextInput, View} from 'react-native';
import style from './style';

import {Controller} from 'react-hook-form';

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
}) => {
  const InputComponent = ({field}) => {
    const {onChange, onBlur, value} = field;
    return (
      <TextInput
        ref={ref}
        onChangeText={e => onChange(e)}
        onBlur={onBlur}
        value={value}
        secureTextEntry={isPassword}
        style={style.input}
        placeholder={placeholder}
        underlineColorAndroid={'transparent'}
        keyboardType={!!keyboardType ? keyboardType : 'default'}
        editable={editable}
        placeholderTextColor={'gray'}
        autoCapitalize="none"
        maxLength={maxLength}
      />
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
