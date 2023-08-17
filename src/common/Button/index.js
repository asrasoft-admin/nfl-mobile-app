import React from 'react';
import {NativeTouchable} from '../NativeTouchable';
import {Text} from 'react-native';
import style from './style';
import {View} from 'react-native';

export const Button = ({
  onPress,
  active = true,
  label,
  icon,
  containerStyles = {},
  customLabelStyle = {},
  loading,
}) => {
  return (
    <NativeTouchable
      onPress={active ? onPress : () => {}}
      style={{
        ...style.container,
        ...containerStyles,
      }}>
      <Text style={[style.label, customLabelStyle]}>
        {loading ? 'loading...' : label}
      </Text>
      {icon && <View style={style.iconContainer}>{icon}</View>}
    </NativeTouchable>
  );
};
