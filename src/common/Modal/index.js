import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Modal, Text, View, ActivityIndicator} from 'react-native';
import style from './style';
import {widthPercentageToDP as wp} from '../../utils/responsive';
import {Button} from '../Button';

const CustomModal = memo(
  ({
    onPress,
    isLoading,
    modalVisible,
    onShow,
    onClose,
    label = 'Submit',
    customer,
    isLoadingTwo,
  }) => {
    const {control, handleSubmit, ref, formState} = useForm({
      mode: 'onChange',
      reValidateMode: 'onChange',
    });

    return (
      <View style={style.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={style.mainContainer}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={style.modalText}>Are you sure to submit data</Text>

                <Button
                  label={!isLoading && 'Yes'}
                  primary={formState.isValid}
                  icon={
                    isLoading && (
                      <ActivityIndicator
                        style={{position: 'absolute', left: wp('21')}}
                      />
                    )
                  }
                  disabled={isLoading}
                  active={formState.isValid && !isLoading}
                  onPress={onPress}
                  containerStyles={style.btn}
                />

                <Button
                  label={'Close'}
                  isWhite={true}
                  primary={formState.isValid}
                  onPress={handleSubmit(onClose)}
                  containerStyles={style.btn}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Button
          label={label}
          primary={formState.isValid}
          icon={
            customer &&
            isLoading && (
              <ActivityIndicator
                style={{position: 'absolute', left: wp('21')}}
              />
            )
          }
          disabled={(customer && isLoading) || isLoadingTwo}
          onPress={onShow}
          containerStyles={{marginVertical: 15}}
        />
      </View>
    );
  },
);

export default CustomModal;
