import React from 'react';
import style from './style';
import {View, Text, Image} from 'react-native';
import {Button} from '..';

export const Deal = ({containerStyles, handleSelect, deal, label}) => {
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
      <Text style={style.price}> {deal?.price} PKR</Text>
      <Text>{deal?.description}</Text>
      <Button
        label={deal.selected ? 'selected' : 'select'}
        containerStyles={style.btn}
        onPress={handleSelect}
      />
    </View>
  );
};
