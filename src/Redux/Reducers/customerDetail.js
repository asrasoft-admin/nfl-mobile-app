import {OTP_CODE, OTP_ID} from '../types';

const initialState = {
  otpCode: '',
  id: '',
};

const customerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_CODE:
      return {
        ...state,
        otpCode: action.payload,
      };
    case OTP_ID:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default customerDetailReducer;
