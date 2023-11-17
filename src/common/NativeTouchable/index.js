import React from 'react';
import {TouchableOpacity, View, TouchableNativeFeedback} from 'react-native';

export const NativeTouchable = ({
  onPress,
  style,
  background,
  children,
  disabled,
}) => {
  return Platform.OS == 'ios' ? (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={
        style
          ? {
              width: style.width,
              height: style.height,
              borderRadius: style.borderRadius,
              marginRight: style.marginRight,
              marginTop: style.marginTop,
              marginLeft: style.marginLeft,
              marginHorizontal: style.marginHorizontal,
              marginBottom: style.marginBottom,
              marginVertical: style.marginVertical,
              marginStart: style.marginStart,
              marginEnd: style.marginEnd,
              margin: style.margin,
              overflow: 'hidden',
            }
          : {overflow: 'hidden'}
      }>
      <TouchableNativeFeedback
        onPress={!disabled && onPress}
        background={
          background || TouchableNativeFeedback.SelectableBackground()
        }
        disabled={disabled}>
        <View
          style={{
            ...style,
            marginRight: 0,
            marginTop: 0,
            marginLeft: 0,
            marginHorizontal: 0,
            marginBottom: 0,
            marginVertical: 0,
            marginStart: 0,
            marginEnd: 0,
            margin: 0,
          }}>
          {children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
