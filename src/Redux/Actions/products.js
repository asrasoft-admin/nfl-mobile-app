import {productConstants} from '../types';

export const productAction = allProducts => {
  return {
    type: productConstants.ALL_PRODUCTS,
    payload: allProducts,
  };
};
