import {areaConstants} from '../types';

const initialState = {
  error: '',
  data: [],
};

const areaReducer = (state = initialState, action) => {
  switch (action.type) {
    case areaConstants.FETCH_AREA_REQUEST:
      return {
        ...state,
      };
    case areaConstants.FETCH_AREA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case areaConstants.FETCH_AREA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default areaReducer;
