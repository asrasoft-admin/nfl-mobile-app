import {OTPCODE} from '../types';

export const otpCodeAction = otpCode => {
  return {
    type: OTPCODE,
    payload: otpCode,
  };
};
