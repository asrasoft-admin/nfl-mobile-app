import {OTPCODE, SAVE_CUSTOMER, UPDATE_CUSTOMER} from '../types';

export const otpCodeAction = otpCode => {
  return {
    type: OTPCODE,
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
