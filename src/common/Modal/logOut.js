import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Modal, Text, View, ActivityIndicator} from 'react-native';
import style from './style';
import {widthPercentageToDP as wp} from '../../utils/responsive';
import {Button} from '../Button';

const LogOutModal = ({onPress, isLoading, modalVisible, onClose}) => {
  const {handleSubmit, formState} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  return (
    <View style={style.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={style.mainContainer}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Are you sure to logout</Text>

              <Button
                label={!isLoading && 'Logout'}
                primary={formState.isValid}
                icon={
                  isLoading && (
                    <ActivityIndicator
                      style={{position: 'absolute', left: wp('21')}}
                    />
                  )
                }
                active={formState.isValid && !isLoading}
                onPress={onPress}
                containerStyles={style.btn}
              />

              <Button
                label={'Close'}
                primary={formState.isValid}
                onPress={handleSubmit(onClose)}
                containerStyles={style.btn}
                isWhite={true}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* <Button
        label={'Submit'}
        primary={formState.isValid}
        onPress={handleSubmit(onShow)}
        containerStyles={{marginVertical: 15}}
      /> */}
    </View>
  );
};

export default LogOutModal;
