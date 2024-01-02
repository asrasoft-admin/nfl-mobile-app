import {OTPCODE, SAVE_CUSTOMER, UPDATE_CUSTOMER} from '../types';
import {OTP_CODE, OTP_ID} from '../types';

const initialState = {
  otpCode: '',
  cloneAllCustomerDetails: [],
  id: '',
};

const customerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTP_CODE:
      return {
        ...state,
        otpCode: action.payload,
      };
    case SAVE_CUSTOMER:
      return {
        ...state,
        cloneAllCustomerDetails: [
          ...state.cloneAllCustomerDetails,
          ...action.payload,
        ],
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        cloneAllCustomerDetails: [...action.payload],
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
