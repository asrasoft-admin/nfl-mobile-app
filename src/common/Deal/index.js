import React, {useState} from 'react';
import style from './style';
import {View, Text, Image} from 'react-native';
import {Button, Input} from '..';
import {TextInput} from 'react-native-gesture-handler';

export const Deal = ({
  containerStyles,
  handleSelect,
  deal,
  label,
  quantities,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = text => {
    setInputValue(text);
  };
  const selected = () => {
    if (deal?.selected === true) {
      return (
        <Image
          source={require('assets/images/check.png')}
          style={style.texture}
          resizeMode="cover"
        />
      );
    } else {
      return <View style={style.texture} />;
    }
  };

  return (
    <View style={[style.container, containerStyles && containerStyles]}>
      <View style={style.checkBox}>{selected()}</View>
      <Text style={style.dealName}>{deal?.name}</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          marginBottom: 10,
          borderWidth: 0.5,
          borderColor: '#8080',
        }}>
        <Text style={style.price}> {deal?.price} PKR</Text>
        {deal?.selected && (
          <TextInput
            style={{
              height: 35,
              padding: 6,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 6,
            }}
            value={quantities.find(item => item.id === deal.id)?.quantity}
            onChangeText={text => onChange(deal.id, text)}
            placeholder="Enter Qty"
            keyboardType="numeric"
          />
        )}
      </View>
      <Text>{deal?.description}</Text>
      <Button
        label={deal.selected ? 'selected' : 'select'}
        containerStyles={style.btn}
        onPress={handleSelect}
      />
    </View>
  );
};
