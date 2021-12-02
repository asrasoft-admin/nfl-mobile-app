import React from 'react';
import style from './style';
import {Text, View} from 'react-native';
import {Controller} from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';

export const CheckBoxComp = ({item, control, name, value, onChange}) => {
  const Render = ({field}) => {
    const {onChange, value} = field;

    return (
      <View style={style.product}>
        <CheckBox
          disabled={false}
          value={value}
          onValueChange={onChange}
          tintColors={{false: 'green', true: 'green'}}
        />
        <Text style={style.description}>{item?.description}</Text>
      </View>
    );
  };
  return (
    <Controller
      control={control}
      render={Render}
      name={name}
      defaultValue={false}
    />
  );
};
