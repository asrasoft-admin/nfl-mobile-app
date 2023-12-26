import {OTP_CODE, OTP_ID} from '../types';

export const otpCodeAction = otpCode => {
  return {
    type: OTP_CODE,
    payload: otpCode,
  };
};

export const getOTPId = id => {
  return {
    type: OTP_ID,
    payload: id,
  };
};
