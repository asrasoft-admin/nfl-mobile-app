import React from 'react';
import {View, Text} from 'react-native';
import style from './style';
import {Picker} from '@react-native-community/picker';
import {Controller} from 'react-hook-form';

export const Dropdown = ({
  items = [
    {name: 'Area', id: 'Area'},
    {name: 'Gulshan', id: 'Gulshan'},
  ],

  containerStyles,
  control,
  error,
  name,
  message,
  enabledFalse,
}) => {
  const Dropdown = ({field}) => {
    const {onChange, value} = field;
    return (
      <View style={[style.container, containerStyles && containerStyles]}>
        <View style={style.pickerView}>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={style.filterValue}
            mode="dropdown"
            enabled={enabledFalse ? false : true}>
            {items.map((item, index) => (
              <Picker.Item
                label={item.name}
                value={item.id}
                key={`${item.id} ${index}`}
                color="gray"
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Controller
        control={control}
        render={Dropdown}
        name={name}
        defaultValue={items[0]?.id}
      />
      {error && <Text style={style.textError}>{message}</Text>}
    </View>
  );
};
