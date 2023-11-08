import {SAVE_SHOPKEEPER_DETAIL} from '../types';

const initialState = {
  shopkeeperData: {},
};

const shopkeeperDetails = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SHOPKEEPER_DETAIL:
      return {
        ...state,
        shopkeeperData: action.payload,
      };
    default:
      return state;
  }
};

export default shopkeeperDetails;
