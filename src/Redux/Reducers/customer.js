// customerReducer.js
// import { SET_CUSTOMER_DETAILS } from './customerActionTypes';

import {SET_CUSTOMER_DETAILS} from '../types';

const initialState = {};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
