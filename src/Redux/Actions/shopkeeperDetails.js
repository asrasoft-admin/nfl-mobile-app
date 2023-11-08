import {SAVE_SHOPKEEPER_DETAIL} from '../types';

export const shopkeeperDetail = data => {
  return {
    type: SAVE_SHOPKEEPER_DETAIL,
    payload: data,
  };
};
