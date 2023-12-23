import {OTPCODE, SAVE_CUSTOMER, UPDATE_CUSTOMER} from '../types';

const initialState = {
  otpCode: '',
  cloneAllCustomerDetails: [],
};

const customerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTPCODE:
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
    default:
      return state;
  }
};

export default customerDetailReducer;
