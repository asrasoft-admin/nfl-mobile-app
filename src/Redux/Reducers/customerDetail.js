import {OTPCODE} from '../types';

const initialState = {
  otpCode: '',
};

const customerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTPCODE:
      return {
        ...state,
        otpCode: action.payload,
      };
    default:
      return state;
  }
};

export default customerDetailReducer;
