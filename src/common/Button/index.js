import React from 'react';
import {NativeTouchable} from '../NativeTouchable';
import {Text} from 'react-native';
import style from './style';
import {View} from 'react-native';
import {colors} from '../../assets/colors';

export const Button = ({
  onPress,
  active = true,
  label,
  icon,
  containerStyles = {},
  customLabelStyle = {},
  loading,
  isWhite,
  disabled,
}) => {
  return (
    <NativeTouchable
      onPress={active ? onPress : () => {}}
      disabled={disabled}
      style={{
        ...style.container,
        ...containerStyles,
        backgroundColor: isWhite ? colors.white : colors.purple,
        backgroundColor: disabled ? colors.gray4 : colors.purple,
        borderColor: disabled ? colors.gray4 : colors.purple,
      }}>
      <Text
        style={[
          style.label,
          customLabelStyle,
          {color: isWhite ? 'black' : colors.activeColor},
        ]}>
        {loading ? 'loading...' : label}
      </Text>
      {icon && <View style={style.iconContainer}>{icon}</View>}
    </NativeTouchable>
  );
};
