import {productConstants} from '../types';

const initialState = {
  data: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.ALL_PRODUCTS:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
