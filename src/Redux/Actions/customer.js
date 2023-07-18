// customerActions.js

import {SET_CUSTOMER_DETAILS} from '../types';

export const setCustomerDetails = details => ({
  type: SET_CUSTOMER_DETAILS,
  payload: details,
});
