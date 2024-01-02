import {OTPCODE, SAVE_CUSTOMER, UPDATE_CUSTOMER} from '../types';
import {OTP_CODE, OTP_ID} from '../types';

export const otpCodeAction = otpCode => {
  return {
    type: OTP_CODE,
    payload: otpCode,
  };
};

export const saveCustomerDetail = payload => {
  return {
    type: SAVE_CUSTOMER,
    payload: payload,
  };
};

export const updateCustomerDetail = payload => {
  return {
    type: UPDATE_CUSTOMER,
    payload: payload,
  };
};

export const getOTPId = id => {
  return {
    type: OTP_ID,
    payload: id,
  };
};
